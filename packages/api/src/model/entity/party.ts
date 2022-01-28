import { BaseItem } from "./baseItem";
import { TrackEntity } from "./track";

export interface SpotifyCredentials {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

export interface PartyEntity extends BaseItem {
    partyId: string;
    activeRoundId?: string;
    spotifyCredentials: SpotifyCredentials;
    createdAt: string;
    updatedAt: string;
}
