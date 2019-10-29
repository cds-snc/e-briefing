resource "aws_acm_certificate" "ebrief" {
  domain_name       = "ebrief.cdssandbox.xyz"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}