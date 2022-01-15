import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { inject } from "inversify";
import { IPartyRepository } from "../../../interfaces/iPartyRepository";
import { container } from "./castVote.di";

export class CastVoteController {

    constructor(@inject(IPartyRepository) private partyRepository: IPartyRepository) {
    }

    public handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
        this.partyRepository.getParty();
    }
}

// Construct controller class using DI, and export its handler method
export const handler = container.get(CastVoteController).handler;