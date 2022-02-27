import 'reflect-metadata';
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { inject, injectable } from "inversify";
import { getDiContainer } from "./finishRound.di";
import { badRequest, internalError, ok } from "../../../util/responseHelper";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { PartyEntity } from "../../../model/entity/party";
import { IVoteRepository } from "../../../interface/IVoteRepository";
import { VotesEntity } from "../../../model/entity/votes";
import { ITrackRepository } from "../../../interface/ITrackRepository";
import { ISpotifyService } from "../../../interface/ISpotifyService";
import { mapToDto, mapToEntity } from "../../../model/dto/spotifyCredentials";
import { TrackEntity } from '../../../model/entity/track';
import { FinishRoundResponse } from '@spotify-party-vote/core';

@injectable()
class FinishRound {

  constructor(
    @inject(IPartyRepository) private partyRepository: IPartyRepository,
    @inject(IRoundRepository) private roundRepository: IRoundRepository,
    @inject(IVoteRepository) private voteRepository: IVoteRepository,
    @inject(ITrackRepository) private trackRepository: ITrackRepository,
    @inject(ISpotifyService) private spotifyService: ISpotifyService
  ) {
  }

  private endRound = async (party: PartyEntity) => {
    await this.partyRepository.updateActiveRound(party.partyId, undefined);
  }

  private getWinningTrackId = (votes: VotesEntity[]): string => {
    const winningTrack: VotesEntity = votes.reduce((winner, track) => {
      if (!winner || track.voteCount > winner.voteCount) {
        return track;
      } else {
        return winner;
      }
    }, undefined as VotesEntity);

    return winningTrack.trackId;
  }

  private playWinningTrack = async (party: PartyEntity, votes: VotesEntity[]): Promise<TrackEntity> => {
    const winningTrackId = this.getWinningTrackId(votes);
    console.log(`Winning track ID: ${winningTrackId}`);

    // Mark track as played
    const partyId = votes[0].partyId;
    const winningTrack = await this.trackRepository.getTrack(partyId, winningTrackId);
    if (!winningTrack) {
      throw new Error('Winning track not found. Try starting a new round');
    }
    winningTrack.playedAt = new Date().toISOString();
    await this.trackRepository.putTrack(partyId, winningTrack);

    // Play on spotify
    const playResult = await this.spotifyService.playTrack(winningTrackId, mapToDto(party.spotifyCredentials));

    if (playResult.refreshedSpotifyCredentials) {
      await this.partyRepository.updateSpotifyCredentials(
        partyId,
        mapToEntity(playResult.refreshedSpotifyCredentials)
      );
    }

    return winningTrack;
  }

  public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    const partyId = event.pathParameters.partyId;
    const roundId = event.pathParameters.roundId;

    if (!partyId || !roundId) {
      return badRequest('partyId & roundId required in path parameters');
    }

    const party = await this.partyRepository.getParty(partyId);
    const votes = await this.voteRepository.getVotes(partyId, roundId);

    console.log(votes);

    await this.endRound(party);

    const winningTrack = await this.playWinningTrack(party, votes);

    const response: FinishRoundResponse = {
      track: winningTrack
    };

    return ok(response);
  }
}

const handler = getDiContainer().get(FinishRound).handler;

export { FinishRound, handler };
