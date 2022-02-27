import 'reflect-metadata';
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { inject, injectable } from "inversify";
import { getDiContainer } from "./getVotes.di";
import { badRequest, ok } from "../../../util/responseHelper";
import { IVoteRepository } from "../../../interface/IVoteRepository";
import { TrackVotes } from "@spotify-party-vote/core";

@injectable()
class GetVotes {

  constructor(@inject(IVoteRepository) private voteRepository: IVoteRepository) {
  }

  public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    const partyId = event.pathParameters.partyId;
    const roundId = event.pathParameters.roundId;

    if (!partyId || !roundId) {
      return badRequest('partyId & roundId required in path parameters');
    }

    const votes = await this.voteRepository.getVotes(partyId, roundId);

    const response: TrackVotes[] = votes.map(vote => ({
      trackId: vote.trackId,
      partyId: vote.partyId,
      roundId: vote.roundId,
      voteCount: vote.voteCount,
      nicknames: vote.nicknames,
    }));

    return ok(response);
  }
}

const handler = getDiContainer().get(GetVotes).handler;

export { GetVotes, handler };
