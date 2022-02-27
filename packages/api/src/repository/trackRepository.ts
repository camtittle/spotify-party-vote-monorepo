import { inject, injectable } from "inversify";
import { ITrackRepository } from "../interface/ITrackRepository";
import { TrackEntity } from "../model/entity/track";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { EnvironmentVariable } from '../enum/environmentVariable';
import { IEnvironmentHelper } from '../interface/IEnvironmentHelper';
import { DbItemType } from '../enum/dbItemType';

@injectable()
export class TrackRepository extends ITrackRepository {

  constructor(@inject(IEnvironmentHelper) private readonly environmentHelper: IEnvironmentHelper,
              @inject(DocumentClient) private readonly documentClient: DocumentClient) {
    super();
  }

  private getTableName() {
    return this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.DynamoDbTableName);
  }

  private getPartitionKey(partyId: string): string {
    return `${DbItemType.Track}#${partyId}`;
  }

  public async putTrack(track: TrackEntity): Promise<void> {
    console.log('Put track');

    const params: DocumentClient.PutItemInput = {
      TableName: this.getTableName(),
      Item: track
    };

    await this.documentClient.put(params).promise();
  }

  public async getTrack(partyId: string, trackId: string): Promise<TrackEntity> {
    console.log(`Get track ${trackId}`);

    const params: DocumentClient.GetItemInput = {
      TableName: this.getTableName(),
      Key: {
        partitionKey: this.getPartitionKey(partyId),
        sortKey: trackId
      }
    };

    const result = await this.documentClient.get(params).promise();
    return result.Item as TrackEntity;
  }

  public async getTracks(partyId: string): Promise<TrackEntity[]> {
    const params: DocumentClient.QueryInput = {
      TableName: this.getTableName(),
      KeyConditionExpression: `partitionKey = :partitionKeyVal AND sortKey = :sortyKeyVal`,
      FilterExpression: 'attribute_exists(playedAt) OR playedAt = NULL',
      ExpressionAttributeValues: {
        ':partitionKeyVal': this.getPartitionKey(partyId),
      },
      ConsistentRead: true
    };

    const result = await this.documentClient.query(params).promise();
    return result.Items as TrackEntity[];
  }
}
