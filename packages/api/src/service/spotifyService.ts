import { inject, injectable } from "inversify";
import { ISpotifyService } from "../interface/ISpotifyService";
import { EnvironmentVariable } from "../enum/environmentVariable";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { config } from "../config/config";
import { SpotifyTokenResponse } from "../model/dto/spotifyTokenResponse";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";
import addSeconds from 'date-fns/addSeconds';
import { globalConfig } from "@spotify-party-vote/core";
import isAfter from 'date-fns/isAfter';
import { PlayTrackResult } from "../model/dto/playTrackResult";
import { SpotifyCredentials } from "../model/dto/spotifyCredentials";
import SpotifyWebApi from "spotify-web-api-node";
import { GetTrackResult } from '../model/dto/getTrackResult';

@injectable()
export class SpotifyService extends ISpotifyService {

    constructor(
        @inject(IEnvironmentHelper) private environmentHelper: IEnvironmentHelper,
    ) {
        super();
    }

    private getBasicAuthHeader(): string {
        const clientId = globalConfig.spotify.clientId;
        const clientSecret = this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.SpotifyClientSecret);
        const authHeader = clientId + ':' + clientSecret;
        let buff = Buffer.from(authHeader);
        return buff.toString('base64');
    }

    public async getAuthToken(code: string): Promise<SpotifyCredentials> {
        const data = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.environmentHelper.getEnvironmentVariable(EnvironmentVariable.SpotifyRedirectUri)
        };

        let authHeaderB64 = this.getBasicAuthHeader();
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authHeaderB64}`
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

    private async refreshCredentials(spotifyCredentials: SpotifyCredentials): Promise<SpotifyCredentials> {
        const now = new Date();
        if (isAfter(now, spotifyCredentials.expiresAt)) {
            const data = {
                grant_type: 'refresh_token',
                refresh_token: spotifyCredentials.refreshToken
            };

            const authHeader = this.getBasicAuthHeader();
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authHeader}`
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

        return undefined;
    }

    public async playTrack(trackId: string, credentials: SpotifyCredentials): Promise<PlayTrackResult> {
        const refreshedCredentials = await this.refreshCredentials(credentials);
        if (refreshedCredentials) {
            credentials = refreshedCredentials;
        }

        // TODO inject this with DI
        const spotifyClient = new SpotifyWebApi();
        spotifyClient.setAccessToken(credentials.accessToken);

        const playParams = {
            uris: [
              trackId
            ]
        };
        await spotifyClient.play(playParams);

        return {
            refreshedSpotifyCredentials: refreshedCredentials
        }
    }

    public async getTrack(trackId: string, credentials: SpotifyCredentials): Promise<GetTrackResult> {
        const refreshedCredentials = await this.refreshCredentials(credentials);
        if (refreshedCredentials) {
            credentials = refreshedCredentials;
        }

        const spotifyClient = new SpotifyWebApi();
        spotifyClient.setAccessToken(credentials.accessToken);

        const track = await spotifyClient.getTrack(trackId);

        return {
            refreshedSpotifyCredentials: refreshedCredentials,
            track: {
                trackId,
                artist: track.body.artists.map(x => x.name).join(', '),
                title: track.body.name,
                artworkUrl: track.body.album.images[0].url,
            }
        }
    }


}
