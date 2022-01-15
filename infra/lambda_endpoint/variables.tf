variable "project" {
    type = string
    description = "Name of project"
}

variable "environment" {
    type = string
    description = "Name of environment"
}

variable "name" {
    type = string
    description = "Name of endpoint"
}

variable "code_path" {
    type = string
    description = "Path to function code"
}

variable "handler" {
    type = string
    description = "Path to handler function within code package"
}

variable "s3_bucket_id" {
    type = string
    description = "ID of S3 bucket to upload function code to"
}

variable "lambda_execution_role_arn" {
    type = string
    description = "ARN of IAM role for Lmabda to execute with"
}

variable "apigateway_api_id" {
    type = string
    description = "ID of the API Gateway API"
}

variable "apigateway_execution_arn" {
    type = string
    description = "Execution ARN of the API Gateway API"
}

variable "route_key" {
    type = string
    description = "Route key for the endpoint, eg. GET /health"
}