import { BaseItem } from "./baseItem";
import { DbItemType } from "./itemType";

export interface VoteEntity extends BaseItem {
    partyId: string;
    roundId: string;
    trackId: string;
    nicknames: string[];
    voteCount: number;
    createdAt: string;
    updatedAt: string;
}

// TODO move this logic to repository
export const VoteEntityToDbItem = (entity: VoteEntity): VoteDbItem => {
    return {
        ...entity,
        partitionKey: `${DbItemType.Vote}#${entity.partyId}`,
        sortKey: `${entity.roundId}#${entity.trackId}`
    }
}