import { injectable } from "inversify";
import { IRoundRepository } from "../interfaces/IRoundRepository";
import { RoundEntity } from "../models/entities/round";

@injectable()
export class RoundRepository extends IRoundRepository {
    putRound(round: RoundEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getRound(partyId: string, roundId: string): Promise<RoundEntity> {
        throw new Error("Method not implemented.");
    }
}