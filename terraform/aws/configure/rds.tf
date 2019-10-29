resource "aws_db_subnet_group" "ebrief" {
  name       = "ebrief"
  subnet_ids = ["${aws_subnet.ebrief_rds.*.id}"]
}

resource "aws_db_instance" "ebrief" {
    name                        = "ebrief-db"
    identifier                  = "ebrief"
    username                    = "${var.rds_username}"
    password                    = "${var.rds_password}"
    port                        = "3306"
    engine                      = "mysql"
    engine_version              = "5.7"
    instance_class              = "db.t2.micro"
    allocated_storage           = "10"
    storage_encrypted           = false
    vpc_security_group_ids      = ["${aws_security_group.ebrief_rds.id}"]
    db_subnet_group_name        = "${aws_db_subnet_group.ebrief.name}"
    parameter_group_name        = "default.mysql"
    multi_az                    = "${var.multi_az}"
    storage_type                = "gp2"
    publicly_accessible         = false
    # snapshot_identifier       = "ebrief"
    allow_major_version_upgrade = false
    auto_minor_version_upgrade  = false
    apply_immediately           = true
    maintenance_window          = "sun:02:00-sun:04:00"
    skip_final_snapshot         = false
    copy_tags_to_snapshot       = true
    backup_retention_period     = 30
    backup_window               = "04:00-06:00"
    final_snapshot_identifier   = "ebrief"
}