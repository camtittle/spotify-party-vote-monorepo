import { injectable } from "inversify";
import { ITrackRepository } from "../interface/ITrackRepository";
import { TrackEntity } from "../model/entity/track";

@injectable()
export class TrackRepository extends ITrackRepository {
  putTrack(partyId: string, track: TrackEntity): Promise<void> {
    console.log('Put track');
    return Promise.resolve();
  }

  public async getTrack(partyId: string, trackId: string): Promise<TrackEntity> {
    console.log('Get track');
    // TODO implementation
    return {
      trackId: 'spotify:track:4sNG6zQBmtq7M8aeeKJRMQ',
      partyId: partyId,
      title: 'Roll With Me',
      artist: 'Charli XCX',
      artworkUrl: 'https://static.wikia.nocookie.net/xcx-world/images/8/8a/Number_1_Angel.png/revision/latest?cb=20171107123850',
      createdAt: '',
      updatedAt: '',
      partitionKey: '',
      sortKey: ''
    };
  }

  public async getTracks(partyId: string): Promise<TrackEntity[]> {
    // TODO implementation
    return [
      {
        trackId: 'spotify:track:4sNG6zQBmtq7M8aeeKJRMQ',
        partyId: partyId,
        title: 'Roll With Me',
        artist: 'Charli XCX',
        artworkUrl: 'https://static.wikia.nocookie.net/xcx-world/images/8/8a/Number_1_Angel.png/revision/latest?cb=20171107123850',
        createdAt: '',
        updatedAt: '',
        partitionKey: '',
        sortKey: ''
      },
      {
        trackId: 'spotify:track:0jeJE3TUJ5FrRuVLr7w4JQ',
        partyId: partyId,
        title: 'Euphoria',
        artist: 'Loreen',
        artworkUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Euphoria-by-loreen.JPG',
        createdAt: '',
        updatedAt: '',
        partitionKey: '',
        sortKey: ''
      },
      {
        trackId: 'spotify:track:2ORvnjpTAXtyTKnaGAgFIv',
        partyId: partyId,
        title: 'Born Slippy',
        artist: 'Underworld',
        artworkUrl: 'https://lastfm.freetls.fastly.net/i/u/770x0/39ec47154e755d8f0972cea462c3c803.jpg',
        createdAt: '',
        updatedAt: '',
        partitionKey: '',
        sortKey: ''
      }
    ]
  }
}
