aws-bootstrap:
	cd terraform/aws/bootstrap &&\
	terraform init &&\
	terraform plan
	terraform apply
	terraform output > ../vars.tfvars

aws-configure:
	cd terraform/aws/configure &&\
	terraform init -backend-config=../vars.tfvars  &&\
	terraform plan -var-file=../vars.tfvars &&\
	terraform apply -var-file=../vars.tfvars &&\
	terraform output > ../vars.tfvars
