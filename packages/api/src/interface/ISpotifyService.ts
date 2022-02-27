import { injectable } from "inversify";
import { SpotifyCredentials } from "../model/dto/spotifyCredentials";
import { PlayTrackResult } from "../model/dto/playTrackResult";
import { GetTrackResult } from '../model/dto/getTrackResult';

@injectable()
export abstract class ISpotifyService {
    abstract getAuthToken(code: string): Promise<SpotifyCredentials>;
    abstract playTrack(trackId: string, credentials: SpotifyCredentials): Promise<PlayTrackResult>;
    abstract getTrack(trackId: string, credentials: SpotifyCredentials): Promise<GetTrackResult>;
}
