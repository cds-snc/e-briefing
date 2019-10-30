resource "aws_s3_bucket" "ebrief" {
  bucket = "ebrief-${var.region}"
  acl    = "private"
}

data "aws_elb_service_account" "main" {}

resource "aws_s3_bucket_policy" "ebrief" {
  bucket = "${aws_s3_bucket.ebrief.id}"

  policy = <<POLICY
{
  "Id": "ebriefALBWrite",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ebriefALBWrite",
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::ebrief-${var.region}/alb/*",
      "Principal": {
        "AWS": [
          "${data.aws_elb_service_account.main.arn}"
        ]
      }
    }
  ]
}
POLICY
}

resource "aws_alb" "ebrief" {
  name            = "ebrief-alb"
  subnets         = ["${aws_subnet.ebrief_ecs.*.id}"]
  security_groups = ["${aws_security_group.ebrief_alb.id}"]

  access_logs {
    bucket = "${aws_s3_bucket.ebrief.id}"
    prefix = "alb"
    enabled = true
  }
}

resource "aws_alb_target_group" "ebrief" {
  name        = "ebrief-alb"
  port        = 9000
  protocol    = "HTTP"
  vpc_id      = "${aws_vpc.ebrief.id}"
  target_type = "ip"
  health_check {
    path = "/"
    matcher = "302"
  }
}

resource "aws_alb_listener" "ebrief" {
  load_balancer_arn = "${aws_alb.ebrief.id}"
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = "${aws_acm_certificate.ebrief.arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.ebrief.id}"
    type             = "forward"
  }
}