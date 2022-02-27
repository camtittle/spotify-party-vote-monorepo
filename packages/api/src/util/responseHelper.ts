import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";

export const badRequest = (message?: string): APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode: 400,
        headers: {
            'Content-Type': 'application/json'
        },
        body: message
    }
};

export const internalError = (message?: string): APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json'
        },
        body: message
    }
};


export const ok = <TBody>(body?: TBody): APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    }
};

export const notFound = <TBody>(body?: TBody): APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode: 404,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    }
};
