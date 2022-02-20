import { Track } from "./track";

export interface Round {
    partyId: string;
    roundId: string;
    endsAt: Date;
    tracks: Track[];
}
