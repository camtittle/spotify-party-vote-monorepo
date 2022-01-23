import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { ISpotifyService } from "../../../interface/ISpotifyService";
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { badRequest, ok } from "../../../util/responseHelper";
import { GetSpotifyTokenRequest } from "@spotify-party-vote/core";

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

        return ok(spotifyCredentials);
    }
}

export { GetSpotifyToken };
