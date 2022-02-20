import { BaseItem } from "./baseItem";
import { TrackEntity } from "./track";

export interface RoundEntity extends BaseItem {
    partyId: string;
    roundId: string;
    tracks: TrackEntity[];
    createdAt: string;
    updatedAt: string;
    endsAt: string;
}
