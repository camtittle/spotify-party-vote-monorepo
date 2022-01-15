import { injectable } from "inversify";

@injectable()
export abstract class IPartyRepository {
    abstract getParty(): Promise<void>;
}