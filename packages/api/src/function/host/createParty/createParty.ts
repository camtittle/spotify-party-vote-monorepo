import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { ISpotifyService } from "../../../interface/ISpotifyService";
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { badRequest, ok } from "../../../util/responseHelper";
import { CreatePartyResponse, CreatePartyRequest } from "@spotify-party-vote/core";
import { getDiContainer } from "./createParty.di";
import { config } from "../../../config/config";

@injectable()
class CreateParty {

    constructor(
        @inject(ISpotifyService) private spotifyService: ISpotifyService,
        @inject(IPartyRepository) private partyRepository: IPartyRepository
    ) {
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
        if (!event.body) {
            return badRequest('Body required');
        }

        const body = JSON.parse(event.body) as CreatePartyRequest;
        if (!body.code) {
            return badRequest('Code required');
        }

        const spotifyCredentials = await this.spotifyService.getAuthToken(body.code);

        const party = await this.partyRepository.createParty(config.partyId, {
            accessToken: spotifyCredentials.accessToken,
            refreshToken: spotifyCredentials.refreshToken,
            expiresAt: spotifyCredentials.expiresAt.toISOString()
        });

        const response: CreatePartyResponse = {
            partyId: party.partyId,

        };

        return ok(response);
    }
}

const handler = getDiContainer().get(CreateParty).handler;

export { CreateParty, handler };
