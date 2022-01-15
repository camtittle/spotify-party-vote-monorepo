import { injectable } from "inversify";
import { TrackEntity } from "../model/entity/track";

@injectable()
export abstract class ITrackRepository {
    abstract putTrack(partyId: string, track: TrackEntity): Promise<void>;
    abstract getTracks(partyId: string): Promise<TrackEntity[]>;
}