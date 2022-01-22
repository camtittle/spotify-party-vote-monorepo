import { BaseItem } from "./baseItem";
import { TrackEntity } from "./track";

export interface PartyEntity extends BaseItem {
    partyId: string;
    activeRoundId: string;
    createdAt: string;
    updatedAt: string;
}
