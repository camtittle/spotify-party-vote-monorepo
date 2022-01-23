import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { ISpotifyService } from "../../../interface/ISpotifyService";
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { badRequest, ok } from "../../../util/responseHelper";
import { GetSpotifyTokenRequest, GetSpotifyTokenResponse } from "@spotify-party-vote/core";
import { getDiContainer } from "./getSpotifyToken.di";

@injectable()
class GetSpotifyToken {

    constructor(
        @inject(ISpotifyService) private spotifyService: ISpotifyService,
        @inject(IPartyRepository) private partyRepository: IPartyRepository,
        @inject(IEnvironmentHelper) private environmentHelper: IEnvironmentHelper
    ) {
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
        if (!event.body) {
            return badRequest('Body required');
        }

        const body = JSON.parse(event.body) as GetSpotifyTokenRequest;
        if (!body.code) {
            return badRequest('Code required');
        }

        const spotifyCredentials = await this.spotifyService.getAuthToken(body.code);

        const response: GetSpotifyTokenResponse = {
            accessToken: spotifyCredentials.accessToken,
            refreshToken: spotifyCredentials.refreshToken,
            expiresAt: spotifyCredentials.expiresAt.toISOString()
        };

        return ok(response);
    }
}

const handler = getDiContainer().get(GetSpotifyToken).handler;

export { GetSpotifyToken, handler };
