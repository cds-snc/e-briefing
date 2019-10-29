# Security Groups

# Internet to ALB
resource "aws_security_group" "ebrief_alb" {
  name        = "ebrief-alb"
  description = "Allow access on port 443 only to ALB"
  vpc_id      = "${aws_vpc.ebrief.id}"

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
# ALB TO ECS

resource "aws_security_group" "ebrief_ecs" {
  name        = "ebrief-tasks"
  description = "allow inbound access from the ALB only"
  vpc_id      = "${aws_vpc.ebrief.id}"

  ingress {
    protocol        = "tcp"
    from_port       = "9000"
    to_port         = "9000"
    security_groups = ["${aws_security_group.ebrief_alb.id}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECS to RDS
resource "aws_security_group" "ebrief_rds" {
  name        = "ebrief-rds"
  description = "allow inbound access from the ebrief tasks only"
  vpc_id      = "${aws_vpc.ebrief.id}"

  ingress {
    protocol        = "tcp"
    from_port       = "3306"
    to_port         = "3306"
    security_groups = ["${aws_security_group.ebrief_ecs.id}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
