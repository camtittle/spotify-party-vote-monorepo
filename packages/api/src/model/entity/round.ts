import { BaseItem } from "./baseItem";
import { DbItemType } from "./itemType";
import { TrackEntity } from "./track";

export interface RoundEntity extends BaseItem {
    partyId: string;
    roundId: string;
    tracks: TrackEntity[];
    createdAt: string;
    updatedAt: string;
}

export const RoundEntityToDbItem = (entity: RoundEntity): RoundDbItem => {
    return {
        ...entity,
        partitionKey: `${DbItemType.Round}#${entity.partyId}`,
        sortKey: entity.roundId
    }
}