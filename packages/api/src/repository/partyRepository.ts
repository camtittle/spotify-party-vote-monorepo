import { IPartyRepository } from "../interface/IPartyRepository";
import { inject, injectable } from "inversify";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import { EnvironmentHelper } from "../util/environmentHelper";
import { EnvironmentVariable } from "../enum/environmentVariable";
import { PartyEntity } from "../model/entity/party";
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

    public async updateActiveRound(partyId: string, roundId: string): Promise<PartyEntity> {
        const party: PartyEntity = {
            partitionKey: `${DbItemType.Party}#${partyId}`,
            sortKey: partyId,
            partyId: partyId,
            activeRoundId: roundId,
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
