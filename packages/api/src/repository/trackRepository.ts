import { injectable } from "inversify";
import { ITrackRepository } from "../interfaces/ITrackRepository";
import { TrackEntity } from "../models/entities/track";

@injectable()
export class TrackRepository extends ITrackRepository {
    putTrack(partyId: string, track: TrackEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTracks(partyId: string): Promise<TrackEntity[]> {
        throw new Error("Method not implemented.");
    }
}