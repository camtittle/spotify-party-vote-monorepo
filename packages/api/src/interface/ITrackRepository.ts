import { injectable } from "inversify";
import { TrackEntity } from "../model/entity/track";

@injectable()
export abstract class ITrackRepository {
    abstract putTrack(track: TrackEntity): Promise<void>;
    abstract getTracks(partyId: string): Promise<TrackEntity[]>;
    abstract getTrack(partyId: string, trackId: string): Promise<TrackEntity>;
}
