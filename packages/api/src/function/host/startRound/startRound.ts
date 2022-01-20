import 'reflect-metadata';
import { APIGatewayEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { inject, injectable } from "inversify";
import { getDiContainer } from './startRound.di';
import { IVoteRepository } from '../../../interface/IVoteRepository';
import { IRoundRepository } from '../../../interface/IRoundRepository';
import { ITrackRepository } from '../../../interface/ITrackRepository';
import { badRequest, ok } from '../../../util/responseHelper';
import { StartRoundRequest, StartRoundResponse } from "@spotify-party-vote/core";
import { TrackEntity } from "../../../model/entity/track";

@injectable()
class StartRound {

    constructor(
        @inject(IVoteRepository) private voteRepository: IVoteRepository,
        @inject(IRoundRepository) private roundRepository: IRoundRepository,
        @inject(ITrackRepository) private trackRepository: ITrackRepository
    ) {
    }

    private selectTracks = async (partyId: string): Promise<TrackEntity[]> => {
        return this.trackRepository.getTracks(partyId);
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResultV2> => {
        if (!event.body) {
            return badRequest('Empty body');
        }

        const body = JSON.parse(event.body) as StartRoundRequest;
        const partyId = body.partyId;
        
        if (!partyId) {
            return badRequest('partyId field required')
        }

        // Get unplayed tracks
        const tracks = await this.selectTracks(partyId);

        // Create round item
        const round = await this.roundRepository.createRound(partyId, tracks);

        // Create empty vote items for each track
        await Promise.all(tracks.map(track => {
            return this.voteRepository.createVote(partyId, round.roundId, track);
        }));

        const response = round as StartRoundResponse;
        return ok(response);
    }
}

// Construct controller class using DI, and export its handler method
const handler = getDiContainer().get(StartRound).handler;

export { StartRound, handler }
