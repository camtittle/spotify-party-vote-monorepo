import { injectable } from "inversify";
import { SpotifyCredentials } from "../model/dto/spotifyCredentials";
import { PlayTrackResult } from "../model/dto/playTrackResult";

@injectable()
export abstract class ISpotifyService {
    abstract getAuthToken(code: string): Promise<SpotifyCredentials>;
    abstract playTrack(trackId: string, credentials: SpotifyCredentials): Promise<PlayTrackResult>;
}
