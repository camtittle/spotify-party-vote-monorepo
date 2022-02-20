import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { badRequest, notFound, ok } from "../../../util/responseHelper";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { GetPartyResponse } from "@spotify-party-vote/core";
import { getDiContainer } from "./getParty.di";

@injectable()
class GetParty {

    constructor(
        @inject(IPartyRepository) private partyRepository: IPartyRepository,
        @inject(IRoundRepository) private roundRepository: IRoundRepository)
    {
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
        const partyId = event.pathParameters.partyId;

        if (!partyId) {
            return badRequest('partyId required in query string parameters');
        }

        const party = await this.partyRepository.getParty(partyId);

        if (!party) {
            return notFound('Party not found');
        }

        const response: GetPartyResponse = {
            party: {
                partyId: partyId,
            }
        };

        if (party.activeRoundId) {
            const activeRound = await this.roundRepository.getRound(partyId, party.activeRoundId);
            response.party.activeRound = activeRound ? {
                partyId: activeRound.partyId,
                roundId: activeRound.roundId,
                endsAt: activeRound.endsAt,
                tracks: activeRound.tracks.map(track => ({
                    trackId: track.trackId,
                    artist: track.artist,
                    title: track.title,
                    artworkUrl: track.artworkUrl
                }))
            } : undefined
        }

        return ok(response);
    }
}

// Construct controller class using DI, and export its handler method
const handler = getDiContainer().get(GetParty).handler;

export { GetParty, handler }
