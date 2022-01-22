 module "start_round_endpoint" {
     source = "../lambda_endpoint"
     project = var.project
     environment = var.environment
     name = "startRound"
     code_path = "${path.module}/../../../packages/api/dist/startRound.js"
     handler = "startRound.handler"
     route_key = "POST /round"
     s3_bucket_id = aws_s3_bucket.packages.id
     lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
     apigateway_api_id = aws_apigatewayv2_api.apigw.id
     apigateway_execution_arn = aws_apigatewayv2_api.apigw.execution_arn
     environment_variables = {
          DynamoDbTableName = aws_dynamodb_table.ddb.name
     }
 }

 module "get_party_endpoint" {
      source = "../lambda_endpoint"
      project = var.project
      environment = var.environment
      name = "getParty"
      code_path = "${path.module}/../../../packages/api/dist/getParty.js"
      handler = "getParty.handler"
      route_key = "GET /party"
      s3_bucket_id = aws_s3_bucket.packages.id
      lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
      apigateway_api_id = aws_apigatewayv2_api.apigw.id
      apigateway_execution_arn = aws_apigatewayv2_api.apigw.execution_arn
      environment_variables = {
           DynamoDbTableName = aws_dynamodb_table.ddb.name
      }
 }
