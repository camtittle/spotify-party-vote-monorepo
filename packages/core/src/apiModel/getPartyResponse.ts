import { Round } from "./round";

export interface GetPartyResponse {
    partyId: string;
    activeRound: Round;
}
