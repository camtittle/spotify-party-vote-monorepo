import { inject, injectable } from "inversify";
import { IRoundRepository } from "../interface/IRoundRepository";
import { RoundEntity } from "../model/entity/round";
import { TrackEntity } from "../model/entity/track";
import { v4 as uuid } from 'uuid';
import { DbItemType } from "../enum/dbItemType";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { EnvironmentHelper } from "../util/environmentHelper";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import { EnvironmentVariable } from "../enum/environmentVariable";
import addMinutes from 'date-fns/addMinutes';

@injectable()
export class RoundRepository extends IRoundRepository {

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
        return `${DbItemType.Round}#${partyId}`;
    }

    public async createRound(partyId: string, tracks: TrackEntity[]): Promise<RoundEntity> {
        console.log(`Creating round for party ${partyId} with tracks ${tracks.map(x => x.title).join(', ')}`);
        console.log(`table name: ${this.getTableName()}`);
        const roundId = uuid();
        const endsAt = addMinutes(new Date(), 30);
        const round: RoundEntity = {
            partitionKey: this.getPartitionKey(partyId),
            sortKey: roundId,
            partyId: partyId,
            roundId: roundId,
            tracks: tracks,
            endsAt: endsAt.toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const params: DocumentClient.PutItemInput = {
            TableName: this.getTableName(),
            Item: round
        };

        await this.documentClient.put(params).promise();

        return round;
    }

    public async getRound(partyId: string, roundId: string): Promise<RoundEntity> {
        console.log(`Getting round with Id ${roundId} for partyId ${partyId}`);

        if (!roundId) {
            throw new Error('RoundRepository:getRound - Round ID required');
        }

        const params: DocumentClient.GetItemInput = {
            TableName: this.getTableName(),
            Key: {
                partitionKey: this.getPartitionKey(partyId),
                sortKey: roundId
            }
        };

        const result = await this.documentClient.get(params).promise();

        if (!result.Item) {
            return undefined;
        }

        return result.Item as RoundEntity;
    }
}
