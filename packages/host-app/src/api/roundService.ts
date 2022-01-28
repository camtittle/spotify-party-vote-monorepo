import { StartRoundRequest, StartRoundResponse } from "@spotify-party-vote/core";
import { Round } from "../models/round";
import { buildApiRequest } from "./apiService";

export namespace RoundService {

    enum Endpoint {
        StartRound = '/round',
        GetRound = '/round/{roundId}'
    }

    export const startRound = async (partyId: string): Promise<Round> => {
        const request: StartRoundRequest = {
            partyId
        };

        const response = await buildApiRequest<StartRoundResponse>('POST', Endpoint.StartRound)
            .withBody(request)
            .send();

        return {
            partyId: response.partyId,
            roundId: response.roundId,
            tracks: response.tracks.map(t => ({
                trackId: t.trackId,
                title: t.title,
                artist: t.artist,
                artworkUrl: t.artworkUrl
            }))
        };
    };

}
