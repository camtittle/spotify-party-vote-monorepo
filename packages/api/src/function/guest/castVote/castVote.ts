import 'reflect-metadata';
import { APIGatewayEvent, Context } from "aws-lambda";
import { inject, injectable } from "inversify";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { getDiContainer } from './castVote.di';

@injectable()
class CastVoteController {

    constructor(@inject(IRoundRepository) private partyRepository: IRoundRepository) {
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<void> => {
        this.partyRepository.getParty();
        console.log('hello');
    }
}

// Construct controller class using DI, and export its handler method
const handler = getDiContainer().get(CastVoteController).handler;

export { CastVoteController, handler }