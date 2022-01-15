import { Container } from "inversify";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { PartyRepository } from "../../../repository/roundRepository";
import { CastVoteController } from "./castVote";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetDocumentClient } from '../../../repository/dynamoDbClient';

export const getDiContainer = () => {
    const container = new Container();
    container.bind(IRoundRepository).to(PartyRepository);
    container.bind(CastVoteController).to(CastVoteController);
    container.bind(DocumentClient).toConstantValue(GetDocumentClient());
    return container;
}
