import { BaseItem } from "./baseItem";
import { DbItemType } from "../../enum/dbItemType";

export interface VotesEntity extends BaseItem {
    partyId: string;
    roundId: string;
    trackId: string;
    nicknames: string[];
    voteCount: number;
    createdAt: string;
    updatedAt: string;
}