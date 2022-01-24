import { GetSpotifyTokenRequest, GetSpotifyTokenResponse } from "@spotify-party-vote/core";
import * as ApiService from './apiService';

enum Endpoint {
    Token = '/spotify/token'
};

export namespace SpotifyService {

    let credentials: GetSpotifyTokenResponse;

    export const getAccessToken = async (code: string): Promise<GetSpotifyTokenResponse> => {
        const body: GetSpotifyTokenRequest = {
            code
        };

        const response = await ApiService.post<GetSpotifyTokenResponse>(Endpoint.Token, body);
        credentials = response;
        return response;
    }

}
