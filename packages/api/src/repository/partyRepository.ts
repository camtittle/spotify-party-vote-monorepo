import { IPartyRepository } from "../interface/IPartyRepository";
import { inject, injectable } from "inversify";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import { EnvironmentHelper } from "../util/environmentHelper";
import { EnvironmentVariable } from "../enum/environmentVariable";
import { PartyEntity, SpotifyCredentials } from "../model/entity/party";
import { DbItemType } from "../enum/dbItemType";

@injectable()
export class PartyRepository extends IPartyRepository {

    constructor(
        @inject(DocumentClient) private documentClient: DocumentClient,
        @inject(IEnvironmentHelper) private environmentHelper: EnvironmentHelper
    ) {
        super();
    }

    private getTableName() {
        return this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.DynamoDbTableName);
    }

    private getPartitionKey(partyId: string): string {
        return `${DbItemType.Party}#${partyId}`;
    }

    public async updateActiveRound(partyId: string, roundId: string): Promise<void> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.getTableName(),
            Key: {
                partitionKey: this.getPartitionKey(partyId),
                sortKey: partyId
            },
            UpdateExpression: 'SET activeRoundId = :roundId, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':roundId': roundId,
                ':updatedAt': new Date().toISOString()
            }
        };

        await this.documentClient.update(params).promise();
    }

    public async getParty(partyId: string): Promise<PartyEntity> {
        console.log(`Getting party with Id ${partyId}`);

        const params: DocumentClient.GetItemInput = {
            TableName: this.getTableName(),
            Key: {
                partitionKey: this.getPartitionKey(partyId),
                sortKey: partyId
            }
        };

        const result = await this.documentClient.get(params).promise();

        if (!result.Item) {
            return undefined;
        }

        return result.Item as PartyEntity;
    }

    public async createParty(partyId: string, spotifyCredentials: SpotifyCredentials): Promise<PartyEntity> {
        const party: PartyEntity = {
            partitionKey: this.getPartitionKey(partyId),
            sortKey: partyId,
            partyId: partyId,
            spotifyCredentials: {
                accessToken: spotifyCredentials.accessToken,
                refreshToken: spotifyCredentials.refreshToken,
                expiresAt: spotifyCredentials.expiresAt
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const params: DocumentClient.PutItemInput = {
            TableName: this.getTableName(),
            Item: party
        };

        await this.documentClient.put(params).promise();

        return party;
    }
}
