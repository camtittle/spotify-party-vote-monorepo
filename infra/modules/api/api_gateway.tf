

# API Gateway
resource "aws_apigatewayv2_api" "apigw" {
  name          = "${var.project}-${var.environment}-apigw"
  protocol_type = "HTTP"

  cors_configuration {
    allow_credentials = true
    allow_origins = var.cors_allow_origins
    allow_methods = ["*"]
    allow_headers = ["Authorization", "Content-Type"]
  }
}

resource "aws_apigatewayv2_stage" "apigw" {
  api_id = aws_apigatewayv2_api.apigw.id

  name        = var.environment
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.apigw.name}"
  retention_in_days = 30
}
