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

variable "spotify_client_secret" {
  type = string
}

variable "spotify_redirect_uri" {
  type = string
}

module "api" {
  source = "../../modules/api"
  project = "spotifypartyvote"
  environment = "prod"
  spotify_client_secret = var.spotify_client_secret
  spotify_redirect_uri = var.spotify_redirect_uri
}
