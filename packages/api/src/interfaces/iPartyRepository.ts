export abstract class IPartyRepository {
    abstract getParty(): Promise<void>;
}