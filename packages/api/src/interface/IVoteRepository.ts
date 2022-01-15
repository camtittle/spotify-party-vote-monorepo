import { injectable } from "inversify";
import { RoundEntity } from "../model/entity/round";

@injectable()
export abstract class IVoteRepository {
    abstract getVotes(partyId: string, roundId: string, trackId: string): Promise<void>;
    abstract addVote(partyId: string, roundId: string, trackId: string, nickname: string): Promise<RoundEntity>;
}