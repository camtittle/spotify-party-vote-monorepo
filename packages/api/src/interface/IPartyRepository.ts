import { injectable } from "inversify";
import { TrackEntity } from "../model/entity/track";
import { VotesEntity } from "../model/entity/votes";
import { PartyEntity, SpotifyCredentials } from "../model/entity/party";

@injectable()
export abstract class IPartyRepository {
    abstract updateActiveRound(partyId: string, roundId: string): Promise<void>;
    abstract getParty(partyId: string): Promise<PartyEntity>;
    abstract createParty(partyId: string, spotifyCredentials: SpotifyCredentials): Promise<PartyEntity>;
    abstract updateSpotifyCredentials(partyId: string, spotifyCredentials: SpotifyCredentials): Promise<void>;
}
