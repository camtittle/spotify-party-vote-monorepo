import { BaseItem } from "../../../model/entity/baseItem";
import { localDocumentClient, localDynamoDbClient } from "./dynamoDbLocalClient";

export const tableName = 'parties';

export const initialiseDatabase = async () => {
    console.log('Deleting DynamoDb table');
    await localDynamoDbClient.deleteTable({
        TableName: tableName
    }).promise();

    console.log('Creating DynamoDb table')
    await localDynamoDbClient.createTable({
        TableName: tableName,
        KeySchema: [
            {
                AttributeName: 'partitionKey',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'sortKey',
                KeyType: 'RANGE'
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'partitionKey',
                AttributeType: 'S'
            },
            {
                AttributeName: 'sortKey',
                AttributeType: 'S'
            }
        ],
        BillingMode: 'PAY_PER_REQUEST'
    }).promise();
}

export const purgeDatabase = async () => {
    const result = await localDocumentClient.scan({
        TableName: tableName
    }).promise();

    const items = result.Items as BaseItem[];

    await Promise.all(items.map(item => localDocumentClient.delete({
        TableName: tableName,
        Key: {
            partitionKey: item.partitionKey,
            sortKey: item.sortKey
        }
    })));
}
