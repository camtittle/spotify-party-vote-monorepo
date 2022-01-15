# Package up code in zip and upload to S3
data "archive_file" "code_package" {
  type = "zip"

  source_file = var.code_path
  output_file_mode = "0666"
  output_path = "${path.module}/dist/${var.name}.js.zip"
}

resource "aws_s3_bucket_object" "code_package" {
  bucket = var.s3_bucket_id

  key    = "${var.name}.zip"
  source = data.archive_file.code_package.output_path

  etag = filemd5(data.archive_file.code_package.output_path)
}

resource "aws_lambda_function" "endpoint" {
  function_name = "${var.project}-${var.environment}-${var.name}"

  s3_bucket = var.s3_bucket_id
  s3_key    = aws_s3_bucket_object.code_package.key

  runtime = "nodejs12.x"
  handler = var.handler

  source_code_hash = data.archive_file.code_package.output_base64sha256

  role = var.lambda_execution_role_arn
}

resource "aws_cloudwatch_log_group" "endpoint" {
  name = "/aws/lambda/${aws_lambda_function.endpoint.function_name}"
  retention_in_days = 30
}

# API Gateway integration
resource "aws_apigatewayv2_integration" "endpoint" {
  api_id = var.apigateway_api_id
  integration_uri    = aws_lambda_function.endpoint.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "endpoint" {
  api_id = var.apigateway_api_id
  route_key =  var.route_key
  target    = "integrations/${aws_apigatewayv2_integration.endpoint.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.endpoint.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.apigateway_execution_arn}/*/*"
}