resource "aws_ecs_cluster" "ebrief" {
  name = "ebrief-cluster"
}

resource "aws_cloudwatch_log_group" "ebrief" {
  name = "/ecs/ebrief"
}

data "aws_iam_policy_document" "ebrief_log_publishing" {
  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:PutLogEventsBatch",
    ]
    resources = ["arn:aws:logs:${var.region}:*:log-group:/ecs/ebrief:*"]
  }
}

resource "aws_iam_policy" "ebrief_log_publishing" {
  name        = "ebrief-log-pub"
  path        = "/"
  description = "Allow publishing to cloudwach"

  policy = "${data.aws_iam_policy_document.ebrief_log_publishing.json}"
}

data "aws_iam_policy_document" "ebrief_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ebrief_role" {
  name               = "ebrief-role"
  path               = "/system/"
  assume_role_policy = "${data.aws_iam_policy_document.ebrief_assume_role_policy.json}"
}


resource "aws_iam_role_policy_attachment" "ebrief_role_log_publishing" {
  role = "${aws_iam_role.ebrief_role.name}"
  policy_arn = "${aws_iam_policy.ebrief_log_publishing.arn}"
}

esource "aws_ecs_task_definition" "ebrief" {
  family                   = "ebrief"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = "${aws_iam_role.ebrief_role.arn}"

  container_definitions = <<DEFINITION
    [
      {
        "image": "ebrief/graphql-engine:v1.0.0-alpha34",
        "name": "ebrief",
        "networkMode": "awsvpc",
        "portMappings": [
          {
            "containerPort": 9000,
            "hostPort": 9000
          }
        ],
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "/ecs/ebrief",
            "awslogs-region": "${var.region}",
            "awslogs-stream-prefix": "ecs"
          }
        },
        "environment": [
        ]
      }
    ]
DEFINITION

}

resource "aws_ecs_service" "ebrief" {
  depends_on      = ["aws_ecs_task_definition.ebrief", "aws_cloudwatch_log_group.ebrief"]
  name            = "ebrief-service"
  cluster         = "${aws_ecs_cluster.ebrief.id}"
  task_definition = "${aws_ecs_task_definition.ebrief.arn}"
  desired_count   = "${var.multi_az == true ? "2" : "1"}"
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip  = true
    security_groups   = ["${aws_security_group.ebrief_ecs.id}"]
    subnets           = ["${aws_subnet.ebrief_ecs.*.id}"]
  }

  load_balancer {
    target_group_arn = "${aws_alb_target_group.ebrief.id}"
    container_name   = "ebrief"
    container_port   = "9000"
  }

  depends_on = [
    "aws_alb_listener.ebrief",
  ]
}