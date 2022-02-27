import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { badRequest, ok } from "../../../util/responseHelper";
import { inject, injectable } from "inversify";
import { getDiContainer } from "./setTracks.di";
import { ITrackRepository } from "../../../interface/ITrackRepository";
import { SetTracksRequest } from "@spotify-party-vote/core";
import { GetTrackResult } from '../../../model/dto/getTrackResult';
import { ISpotifyService } from '../../../interface/ISpotifyService';
import { IPartyRepository } from '../../../interface/IPartyRepository';
import { mapToDto, mapToEntity } from '../../../model/dto/spotifyCredentials';

@injectable()
class SetTracks {

    constructor(@inject(ITrackRepository) private trackRepository: ITrackRepository,
                @inject(ISpotifyService) private spotifyService: ISpotifyService,
                @inject(IPartyRepository) private partyRepository: IPartyRepository) {
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
        const { partyId, trackIds } = JSON.parse(event.body) as SetTracksRequest;
        if (!trackIds) {
            return badRequest('trackIds required');
        }

        if (!partyId) {
            return badRequest('partyId required');
        }

        const party = await this.partyRepository.getParty(partyId);
        let spotifyCredentials = mapToDto(party.spotifyCredentials);
        let refreshedSpotifyCredentials = false;

        const tracks: GetTrackResult[] = [];
        for (const trackId of trackIds) {
            const result = await this.spotifyService.getTrack(trackId, spotifyCredentials);
            if (result.refreshedSpotifyCredentials) {
                spotifyCredentials = result.refreshedSpotifyCredentials;
                refreshedSpotifyCredentials = true;
            }
        }

        if (refreshedSpotifyCredentials) {
            await this.partyRepository.updateSpotifyCredentials(partyId, mapToEntity(spotifyCredentials));
        }

        return ok();
    }

}

const handler = getDiContainer().get(SetTracks).handler;

export { SetTracks, handler }

