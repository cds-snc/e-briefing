### VPC

# Fetch AZs in the current region
data "aws_availability_zones" "available" {}

resource "aws_vpc" "ebrief" {
  cidr_block = "172.17.0.0/16"
}

# Create var.az_count private subnets for RDS, each in a different AZ
resource "aws_subnet" "ebrief_rds" {
  count             = "${var.az_count}"
  cidr_block        = "${cidrsubnet(aws_vpc.ebrief.cidr_block, 8, count.index)}"
  availability_zone = "${data.aws_availability_zones.available.names[count.index]}"
  vpc_id            = "${aws_vpc.ebrief.id}"
}

# Create var.az_count public subnets for ebrief, each in a different AZ
resource "aws_subnet" "ebrief_ecs" {
  count                   = "${var.az_count}"
  cidr_block              = "${cidrsubnet(aws_vpc.ebrief.cidr_block, 8, var.az_count + count.index)}"
  availability_zone       = "${data.aws_availability_zones.available.names[count.index]}"
  vpc_id                  = "${aws_vpc.ebrief.id}"
  map_public_ip_on_launch = true
}

# IGW for the public subnet
resource "aws_internet_gateway" "ebrief" {
  vpc_id = "${aws_vpc.ebrief.id}"
}

# Route the public subnet traffic through the IGW
resource "aws_route" "internet_access" {
  route_table_id         = "${aws_vpc.ebrief.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.ebrief.id}"
}