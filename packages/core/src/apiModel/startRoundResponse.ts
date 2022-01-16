import { Track } from "./track";

export interface StartRoundResponse {
    partyId: string;
    roundId: string;
    tracks: Track[];
}