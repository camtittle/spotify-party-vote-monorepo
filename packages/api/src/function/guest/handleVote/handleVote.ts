import 'reflect-metadata';
import { Context, SQSEvent } from "aws-lambda";
import { inject, injectable } from "inversify";
import { getDiContainer } from './handleVote.di';
import { IVoteRepository } from '../../../interface/IVoteRepository';
import { VoteQueueItem } from '../../../model/dto/voteQueueItem';

@injectable()
class HandleVote {

    constructor(@inject(IVoteRepository) private voteRepository: IVoteRepository) {
    }

    private queueItemIsValid = (item: VoteQueueItem): item is VoteQueueItem => {
        return !!(item.partyId && item.roundId && item.trackId && item.nickname);
    }

    public handler = async (event: SQSEvent, context: Context): Promise<void> => {
        console.log('Received SQS event');
        const promises = event.Records.map(record => {
            const queueItem = JSON.parse(record.body);
            if (!this.queueItemIsValid(queueItem)) {
                console.log('Encountered invalid queue item:');
                console.log(queueItem);
                return Promise.resolve();
            } else {
                return this.voteRepository.addVote(queueItem.partyId, queueItem.roundId, queueItem.trackId, queueItem.nickname);
            }
        });

        await Promise.all(promises);
    }
}

// Construct controller class using DI, and export its handler method
const handler = getDiContainer().get(HandleVote).handler;

export { HandleVote, handler }