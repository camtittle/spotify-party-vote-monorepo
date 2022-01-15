import { injectable } from "inversify";
import { IPartyRepository } from "../interfaces/iPartyRepository";

@injectable()
export class PartyRepository extends IPartyRepository {
    getParty(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}