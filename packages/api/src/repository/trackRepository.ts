import { injectable } from "inversify";
import { ITrackRepository } from "../interface/ITrackRepository";
import { TrackEntity } from "../model/entity/track";

@injectable()
export class TrackRepository extends ITrackRepository {
    putTrack(partyId: string, track: TrackEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTracks(partyId: string): Promise<TrackEntity[]> {
        throw new Error("Method not implemented.");
    }
}