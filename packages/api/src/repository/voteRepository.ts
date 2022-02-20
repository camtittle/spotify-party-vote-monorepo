import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { inject, injectable } from "inversify";
import { DbItemType } from "../enum/dbItemType";
import { EnvironmentVariable } from "../enum/environmentVariable";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import { IVoteRepository } from "../interface/IVoteRepository";
import { TrackEntity } from "../model/entity/track";
import { VotesEntity } from "../model/entity/votes";

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

    public async getVotes(partyId: string, roundId: string): Promise<VotesEntity[]> {
        console.log(`Getting votes for party ${partyId} round ${roundId}`);

        const params: DocumentClient.QueryInput = {
            TableName: this.getTableName(),
            KeyConditionExpression: `partitionKey = :partitionKeyVal`,
            ExpressionAttributeValues: {
                ':partitionKeyVal': this.getPartitionKey(partyId, roundId)
            }
        };

        const result = await this.documentClient.query(params).promise();
        return result.Items as VotesEntity[];
    }

    public async createVote(partyId: string, roundId: string, track: TrackEntity): Promise<VotesEntity> {
        console.log(`Creating empty vote for party ${partyId} for track ${track.title}`);
        const vote: VotesEntity = {
            partitionKey: this.getPartitionKey(partyId, roundId),
            sortKey: track.trackId,
            partyId: partyId,
            roundId: roundId,
            trackId: track.trackId,
            voteCount: 0,
            nicknames: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const params: DocumentClient.PutItemInput = {
            TableName: this.getTableName(),
            Item: vote
        };

        await this.documentClient.put(params).promise();

        return vote;
    }
    
    public async addVote(partyId: string, roundId: string, trackId: string, nickname: string): Promise<void> {
        console.log(`Adding vote for round ID ${roundId} track ID ${trackId} from user ${nickname}`);
        const updateExpression = `SET #n = list_append(#n, :nicknames), #vc = #vc + :v`;
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.getTableName(),
            Key: {
                partitionKey: this.getPartitionKey(partyId, roundId),
                sortKey: trackId
            },
            UpdateExpression: updateExpression,
            ConditionExpression: `NOT contains(#n, :nickname)`,
            ExpressionAttributeNames: {
                '#n': 'nicknames',
                '#vc': 'voteCount'
            },
            ExpressionAttributeValues: {
                ':nicknames': [nickname],
                ':nickname': nickname,
                ':v': 1
            }
        }

        await this.documentClient.update(params).promise();
    }


}
