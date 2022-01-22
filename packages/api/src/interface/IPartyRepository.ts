import { injectable } from "inversify";
import { TrackEntity } from "../model/entity/track";
import { VotesEntity } from "../model/entity/votes";
import { PartyEntity } from "../model/entity/party";

@injectable()
export abstract class IPartyRepository {
    abstract updateActiveRound(partyId: string, roundId: string): Promise<PartyEntity>;
    abstract getParty(partyId: string): Promise<PartyEntity>;
}
