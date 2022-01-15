import { BaseItem } from "./baseItem";

export interface TrackEntity extends BaseItem {
    partyId: string;
    trackId: string;
    title: string;
    artist: string;
    artworkUrl: string;
    createdAt: string;
    updatedAt: string;
}