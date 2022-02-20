import { StartRoundRequest, StartRoundResponse, TrackVotes } from "@spotify-party-vote/core";
import { buildApiRequest, PathParams } from "./apiService";

export namespace VoteService {

  enum Endpoint {
    GetVotes = '/votes/{partyId}/{roundId}'
  }

  export const getVotes = async (partyId: string, roundId: string): Promise<TrackVotes[]> => {
    console.log('Getting track votes');

    const params: PathParams = {
      partyId,
      roundId
    };

    return buildApiRequest<TrackVotes[]>('GET', Endpoint.GetVotes)
      .withPathParams(params)
      .send();
  }
}
