import { CreatePartyRequest, CreatePartyResponse, GetPartyResponse } from "@spotify-party-vote/core";
import { buildApiRequest } from "./apiService";

export namespace PartyService {

    enum Endpoint {
        CreateParty = '/party',
        GetParty = '/party/{partyId}'
    }

    export const getParty = async (partyId: string): Promise<GetPartyResponse> => {
        return await buildApiRequest<GetPartyResponse>('GET', Endpoint.GetParty)
            .withPathParams({ partyId })
            .send();
    };

    export const createParty = async (code: string): Promise<CreatePartyResponse> => {
        const body: CreatePartyRequest = {
            code
        };

        return await buildApiRequest<CreatePartyResponse>('POST', Endpoint.CreateParty)
            .withBody(body)
            .send();
    };
}
