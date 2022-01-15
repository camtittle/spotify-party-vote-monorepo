import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const GetDocumentClient = () => {
    return new DocumentClient();
}