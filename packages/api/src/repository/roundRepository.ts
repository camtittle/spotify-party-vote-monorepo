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

    public async createRound(partyId: string, tracks: TrackEntity[]): Promise<RoundEntity> {
        console.log(`Creating round for party ${partyId} with tracks ${tracks.map(x => x.title).join(', ')}`);
        console.log(`table name: ${this.getTableName()}`);
        const roundId = uuid();
        const round: RoundEntity = {
            partitionKey: `${DbItemType.Round}#${partyId}`,
            sortKey: roundId,
            partyId: partyId,
            roundId: roundId,
            tracks: tracks,
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

    getRound(partyId: string, roundId: string): Promise<RoundEntity> {
        throw new Error("Method not implemented.");
    }
}
