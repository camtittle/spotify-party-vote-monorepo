locals {
    lambda_name = "voteHandler"
}

# Lambda triggered by queue to update DB, send websocket message etc
# Package up code in zip and upload to S3
data "archive_file" "vote_handler_code_package" {
  type = "zip"

  source_file = "${path.module}/../packages/api/dist/handleVote.js"
  output_file_mode = "0666"
  output_path = "${path.module}/dist/${local.lambda_name}.js.zip"
}

resource "aws_s3_bucket_object" "vote_handler_code_package" {
  bucket = aws_s3_bucket.packages.id

  key    = "${local.lambda_name}.zip"
  source = data.archive_file.vote_handler_code_package.output_path

  etag = filemd5(data.archive_file.vote_handler_code_package.output_path)
}

resource "aws_lambda_function" "vote_handler" {
  function_name = "${var.project}-${var.environment}-${local.lambda_name}"
  s3_bucket = aws_s3_bucket.packages.id
  s3_key    = aws_s3_bucket_object.vote_handler_code_package.key
  runtime = "nodejs12.x"
  handler = "handleVote.handler"
  source_code_hash = data.archive_file.vote_handler_code_package.output_base64sha256
  role = aws_iam_role.lambda_exec.arn

  environment {
      variables = {
          DynamoDbTableName = aws_dynamodb_table.ddb.name
      }
  }
}

resource "aws_cloudwatch_log_group" "vote_handler" {
  name = "/aws/lambda/${aws_lambda_function.vote_handler.function_name}"
  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromSQS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.vote_handler.function_name
  principal     = "sqs.amazonaws.com"

  source_arn = aws_sqs_queue.votes.arn
}

# Trigger the lambda with SQS events
resource "aws_lambda_event_source_mapping" "votes_handler" {
  event_source_arn = aws_sqs_queue.votes.arn
  function_name    = aws_lambda_function.vote_handler.function_name
}
