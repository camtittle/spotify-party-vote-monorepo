import { APIGatewayProxyResultV2 } from "aws-lambda";

export const badRequest = (message?: string): APIGatewayProxyResultV2 => {
    return {
        statusCode: 400,
        headers: {
            'Content-Type': 'application/json'
        },
        body: message
    }
};

export const ok = <TBody>(body?: TBody): APIGatewayProxyResultV2 => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    }
};
