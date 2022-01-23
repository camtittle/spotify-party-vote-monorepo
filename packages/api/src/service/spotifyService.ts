import { inject, injectable } from "inversify";
import { ISpotifyService } from "../interface/ISpotifyService";
import { EnvironmentVariable } from "../enum/environmentVariable";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { config } from "../config/config";
import { SpotifyTokenResponse } from "../model/dto/spotifyTokenResponse";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import { SpotifyCredentials } from "../model/dto/spotifyCredentials";
import addSeconds from 'date-fns/addSeconds';
import { globalConfig } from "@spotify-party-vote/core";

@injectable()
export class SpotifyService extends ISpotifyService {

    constructor(
        @inject(IEnvironmentHelper) private environmentHelper: IEnvironmentHelper
    ) {
        super();
    }

    public async getAuthToken(code: string): Promise<SpotifyCredentials> {
        const data = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.SpotifyRedirectUri)
        };

        const clientId = globalConfig.spotify.clientId;
        const clientSecret = this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.SpotifyClientSecret);
        const authHeader = clientId + ':' + clientSecret;
        let buff = new Buffer(authHeader);
        let authHeaderB64 = buff.toString('base64');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeaderB64
        };
        const options: AxiosRequestConfig = {
            method: 'POST',
            headers: headers,
            data: qs.stringify(data),
            url: config.spotify.tokenUrl,
        };

        const response = await axios(options);
        const body = response.data as SpotifyTokenResponse;

        if (!body.access_token || !body.refresh_token) {
            throw new Error('Invalid response from spotify token endpoint');
        }

        return {
            accessToken: body.access_token,
            refreshToken: body.refresh_token,
            expiresAt: addSeconds(new Date(), body.expires_in)
        };
    }


}
