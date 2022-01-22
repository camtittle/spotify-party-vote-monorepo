terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

module "api" {
  source = "../../modules/api"
  project = "spotifypartyvote"
  environment = "prod"
}
