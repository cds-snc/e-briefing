# Service role allowing AWS to manage resources required for ECS
resource "aws_iam_service_linked_role" "ecs_service" {
  aws_service_name = "ecs.amazonaws.com"
}