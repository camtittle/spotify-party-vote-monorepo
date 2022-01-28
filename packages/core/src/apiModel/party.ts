import { Round } from "./round";

export interface Party {
    partyId: string;
    activeRound?: Round;
}
