import { injectable } from "inversify";
import { TrackEntity } from "../model/entity/track";
import { VotesEntity } from "../model/entity/votes";

@injectable()
export abstract class IVoteRepository {
    abstract getVotes(partyId: string, roundId: string): Promise<VotesEntity[]>;
    abstract addVote(partyId: string, roundId: string, trackId: string, nickname: string): Promise<void>;
    abstract createVote(partyId: string, roundId: string, track: TrackEntity): Promise<VotesEntity>;
}
