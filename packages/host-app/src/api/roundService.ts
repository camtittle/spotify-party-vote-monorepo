import { StartRoundRequest, StartRoundResponse, TrackVotes } from "@spotify-party-vote/core";
import { Round } from "../models/round";
import { buildApiRequest } from "./apiService";

export namespace RoundService {

    enum Endpoint {
        StartRound = '/round',
        GetRound = '/round/{roundId}'
    }

    export const startRound = async (partyId: string): Promise<Round> => {
        console.log('Starting round');

        const request: StartRoundRequest = {
            partyId
        };

        const response = await buildApiRequest<StartRoundResponse>('POST', Endpoint.StartRound)
            .withBody(request)
            .send();

        return {
            partyId: response.round.partyId,
            roundId: response.round.roundId,
            endsAt: new Date(response.round.endsAt),
            tracks: response.round.tracks.map(t => ({
                trackId: t.trackId,
                title: t.title,
                artist: t.artist,
                artworkUrl: t.artworkUrl
            }))
        };
    };

}
