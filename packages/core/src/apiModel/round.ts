import { Track } from "./track";

export interface Round {
    partyId: string;
    roundId: string;
    tracks: Track[];
    endsAt: string;
}
