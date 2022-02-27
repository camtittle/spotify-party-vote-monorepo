import { SpotifyApiResult } from './spotifyApiResult';

interface Track {
  trackId: string;
  title: string;
  artist: string;
  artworkUrl: string;
}

export interface GetTrackResult extends SpotifyApiResult {
  track: Track;
}
