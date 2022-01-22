

resource "aws_s3_bucket" "packages" {
  bucket = "${var.project}-${var.environment}-packages"
  acl    = "private"
}

# Lambda execution role
resource "aws_iam_role" "lambda_exec" {
  name = "${var.project}-${var.environment}-lambdaExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })

  inline_policy {
    name = "AllowManageSqsMessages"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"]
          Effect   = "Allow"
          Resource = aws_sqs_queue.votes.arn
        },
      ]
    })
  }

  inline_policy {
    name = "AccessDynamoDb"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = [
            "dynamodb:PutItem",
            "dynamodb:GetItem", 
            "dynamodb:Query", 
            "dynamodb:UpdateItem", 
            "dynamodb:Scan", 
            "dynamodb:DeleteItem"
          ]
          Effect   = "Allow"
          Resource = aws_dynamodb_table.ddb.arn
        },
      ]
    })
  }
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_dynamodb_table" "ddb" {
  name         = "spotify-party-vote"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "partitionKey"
  range_key    = "sortKey"

  attribute {
    name = "partitionKey"
    type = "S"
  }

  attribute {
    name = "sortKey"
    type = "S"
  }
}
