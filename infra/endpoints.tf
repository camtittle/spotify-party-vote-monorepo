module "cast_vote_endpoint" {
    source = "./lambda_endpoint"
    project = var.project
    environment = var.environment
    name = "castVote"
    code_path = "${path.module}/../packages/api/dist/castVote.js"
    handler = "castVote.handler"
    route_key = "POST /vote"
    s3_bucket_id = aws_s3_bucket.packages.id
    lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
    apigateway_api_id = aws_apigatewayv2_api.lambda.id
    apigateway_execution_arn = aws_apigatewayv2_api.lambda.execution_arn
}