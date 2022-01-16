import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { inject, injectable } from "inversify";
import { DbItemType } from "../enum/dbItemType";
import { EnvironmentVariable } from "../enum/environmentVariable";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import { IVoteRepository } from "../interface/IVoteRepository";

@injectable()
export class VoteRepository extends IVoteRepository {

    constructor(@inject(DocumentClient) private documentClient: DocumentClient, 
                @inject(IEnvironmentHelper) private environmentHelper: IEnvironmentHelper) {
        super();
    }

    private getTableName() {
        return this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.DynamoDbTableName);
    }

    private getPartitionKey(partyId: string, roundId: string) {
        return `${DbItemType.Vote}#${partyId}#${roundId}`;
    }

    getVotes(partyId: string, roundId: string, trackId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public async addVote(partyId: string, roundId: string, trackId: string, nickname: string): Promise<void> {
        console.log(`Adding vote for round ID ${roundId} track ID ${trackId} from user ${nickname}`);
        const updateExpression = `ADD nicknames :nickname, voteCount :v`;
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.getTableName(),
            Key: {
                partitionKey: this.getPartitionKey(partyId, roundId),
                sortKey: trackId
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: {
                ':nickname': [nickname],
                ':v': 1
            }
        }

        await this.documentClient.update(params).promise();
    }


}