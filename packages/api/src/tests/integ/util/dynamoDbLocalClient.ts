import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";

export const localDocumentClient = new DocumentClient({
    endpoint: 'http://localhost:8000', // Requires dynamodb-local docker container to be running
    region: 'eu-west-1'
});

export const localDynamoDbClient = new DynamoDB({
    endpoint: 'http://localhost:8000', // Requires dynamodb-local docker container to be running
    region: 'eu-west-1'
});
