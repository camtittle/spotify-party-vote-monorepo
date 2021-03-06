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
      route_key = "GET /party/{partyId}"
      s3_bucket_id = aws_s3_bucket.packages.id
      lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
      apigateway_api_id = aws_apigatewayv2_api.apigw.id
      apigateway_execution_arn = aws_apigatewayv2_api.apigw.execution_arn
      environment_variables = {
           DynamoDbTableName = aws_dynamodb_table.ddb.name
      }
 }

 module "get_spotify_token_endpoint" {
      source = "../lambda_endpoint"
      project = var.project
      environment = var.environment
      name = "getSpotifyToken"
      code_path = "${path.module}/../../../packages/api/dist/createParty.js"
      handler = "createParty.handler"
      route_key = "POST /party"
      s3_bucket_id = aws_s3_bucket.packages.id
      lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
      apigateway_api_id = aws_apigatewayv2_api.apigw.id
      apigateway_execution_arn = aws_apigatewayv2_api.apigw.execution_arn
      environment_variables = {
           DynamoDbTableName = aws_dynamodb_table.ddb.name
           SpotifyClientSecret = var.spotify_client_secret
           SpotifyRedirectUri = var.spotify_redirect_uri
      }
 }

 module "get_votes_endpoint" {
      source = "../lambda_endpoint"
      project = var.project
      environment = var.environment
      name = "getVotes"
      code_path = "${path.module}/../../../packages/api/dist/getVotes.js"
      handler = "getVotes.handler"
      route_key = "GET /votes/{partyId}/{roundId}"
      s3_bucket_id = aws_s3_bucket.packages.id
      lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
      apigateway_api_id = aws_apigatewayv2_api.apigw.id
      apigateway_execution_arn = aws_apigatewayv2_api.apigw.execution_arn
      environment_variables = {
           DynamoDbTableName = aws_dynamodb_table.ddb.name
      }
 }

 module "finish_round_endpoint" {
      source = "../lambda_endpoint"
      project = var.project
      environment = var.environment
      name = "finishRound"
      code_path = "${path.module}/../../../packages/api/dist/finishRound.js"
      handler = "finishRound.handler"
      route_key = "POST /round/finish/{partyId}/{roundId}"
      s3_bucket_id = aws_s3_bucket.packages.id
      lambda_execution_role_arn = aws_iam_role.lambda_exec.arn
      apigateway_api_id = aws_apigatewayv2_api.apigw.id
      apigateway_execution_arn = aws_apigatewayv2_api.apigw.execution_arn
      environment_variables = {
           DynamoDbTableName = aws_dynamodb_table.ddb.name
           SpotifyClientSecret = var.spotify_client_secret
      }
 }

