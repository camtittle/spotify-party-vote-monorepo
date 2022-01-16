import { injectable } from "inversify";
import { RoundEntity } from "../model/entity/round";
import { TrackEntity } from "../model/entity/track";

@injectable()
export abstract class IRoundRepository {
    abstract createRound(partyId: string, tracks: TrackEntity[]): Promise<RoundEntity>;
    abstract getRound(partyId: string, roundId: string): Promise<RoundEntity>;
}