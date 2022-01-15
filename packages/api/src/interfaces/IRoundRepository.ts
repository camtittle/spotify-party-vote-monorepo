import { injectable } from "inversify";
import { RoundEntity } from "../models/entities/round";

@injectable()
export abstract class IRoundRepository {
    abstract putRound(round: RoundEntity): Promise<void>;
    abstract getRound(partyId: string, roundId: string): Promise<RoundEntity>;
}