# Votes get published to SQS queue by API Gateway
resource "aws_sqs_queue" "votes" {
  name = "${var.project}-${var.environment}-votes"
}

# API Gateway integration
# Role to allow API Gateway to publish to SQS queue
resource "aws_iam_role" "apigw_sqs" {
  name = "${var.project}-${var.environment}-apigwSqsIntegrationRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
      },
    ]
  })

  inline_policy {
    name = "AllowPublishToSqs"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["sqs:SendMessage"]
          Effect   = "Allow"
          Resource = aws_sqs_queue.votes.arn
        },
      ]
    })
  }
}

resource "aws_apigatewayv2_integration" "vote_queue" {
  api_id              = aws_apigatewayv2_api.apigw.id
  credentials_arn     = aws_iam_role.apigw_sqs.arn
  integration_type    = "AWS_PROXY"
  integration_subtype = "SQS-SendMessage"

  request_parameters = {
    "QueueUrl" = aws_sqs_queue.votes.url
    "MessageBody" = "$request.body"
  }
}

resource "aws_apigatewayv2_route" "cast_vote" {
  api_id    = aws_apigatewayv2_api.apigw.id
  route_key = "POST /vote"
  target    = "integrations/${aws_apigatewayv2_integration.vote_queue.id}"
}
