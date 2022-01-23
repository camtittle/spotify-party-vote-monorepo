import { injectable } from "inversify";
import { SpotifyCredentials } from "../model/dto/spotifyCredentials";

@injectable()
export abstract class ISpotifyService {
    abstract getAuthToken(code: string): Promise<SpotifyCredentials>;
}
