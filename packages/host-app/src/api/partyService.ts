import { CreatePartyRequest, CreatePartyResponse, GetPartyResponse } from "@spotify-party-vote/core";
import { buildApiRequest } from "./apiService";
import { Party } from "../models/party";

export namespace PartyService {

    enum Endpoint {
        CreateParty = '/party',
        GetParty = '/party/{partyId}'
    }

    const mapPartyModel = (response: GetPartyResponse): Party => {
        return {
            ...response.party,
            activeRound: response.party.activeRound && {
                ...response.party.activeRound,
                endsAt: new Date(response.party.activeRound.endsAt)
            }
        };
    }

    export const getParty = async (partyId: string): Promise<Party> => {
        const response = await buildApiRequest<GetPartyResponse>('GET', Endpoint.GetParty)
            .withPathParams({ partyId })
            .send();

        return mapPartyModel(response);
    };

    export const createParty = async (code: string): Promise<Party> => {
        const body: CreatePartyRequest = {
            code
        };

        const response = await buildApiRequest<CreatePartyResponse>('POST', Endpoint.CreateParty)
            .withBody(body)
            .send();

        return mapPartyModel(response);
    };
}
