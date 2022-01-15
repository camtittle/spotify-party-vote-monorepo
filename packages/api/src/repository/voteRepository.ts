import { injectable } from "inversify";
import { IVoteRepository } from "../interface/IVoteRepository";
import { RoundEntity } from "../model/entity/round";

@injectable()
export class VoteRepository extends IVoteRepository {
    getVotes(partyId: string, roundId: string, trackId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addVote(partyId: string, roundId: string, trackId: string, nickname: string): Promise<RoundEntity> {
        throw new Error("Method not implemented.");
    }
}