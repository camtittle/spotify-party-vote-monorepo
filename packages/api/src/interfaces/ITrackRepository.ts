import { injectable } from "inversify";
import { TrackEntity } from "../models/entities/track";

@injectable()
export abstract class ITrackRepository {
    abstract putTrack(partyId: string, track: TrackEntity): Promise<void>;
    abstract getTracks(partyId: string): Promise<TrackEntity[]>;
}