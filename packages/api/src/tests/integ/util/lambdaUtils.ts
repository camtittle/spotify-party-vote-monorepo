import {
    APIGatewayEvent, APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer,
    APIGatewayProxyEventHeaders, APIGatewayProxyEventMultiValueHeaders,
    APIGatewayProxyEventMultiValueQueryStringParameters, APIGatewayProxyEventPathParameters,
    APIGatewayProxyEventQueryStringParameters, APIGatewayProxyEventStageVariables
} from "aws-lambda";

class APIGatewayEventBuilder implements APIGatewayEvent {
    body: string | null;
    headers: APIGatewayProxyEventHeaders;
    httpMethod: string;
    isBase64Encoded: boolean;
    multiValueHeaders: APIGatewayProxyEventMultiValueHeaders;
    multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters | null;
    path: string;
    pathParameters: APIGatewayProxyEventPathParameters | null;
    queryStringParameters: APIGatewayProxyEventQueryStringParameters | null;
    requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>;
    resource: string;
    stageVariables: APIGatewayProxyEventStageVariables | null;

    withBody<T>(body: T): APIGatewayEventBuilder {
        this.body = JSON.stringify(body);
        return this;
    }

    withHttpMethod(method: string): APIGatewayEventBuilder {
        this.httpMethod = method;
        return this;
    }

    withQueryParameters(params: APIGatewayProxyEventQueryStringParameters): APIGatewayEventBuilder {
        this.queryStringParameters = params;
        return this;
    }
}

export const buildApiGatewayEvent = () : APIGatewayEventBuilder => {
    return new APIGatewayEventBuilder();
}
