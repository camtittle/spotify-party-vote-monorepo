import { APIGatewayProxyResultV2 } from "aws-lambda";

export const badRequest = (message?: string): APIGatewayProxyResultV2 => {
    return {
        statusCode: 400,
        body: message
    }
}