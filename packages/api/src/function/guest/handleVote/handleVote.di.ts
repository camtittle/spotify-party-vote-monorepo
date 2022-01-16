import { Container } from "inversify";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetDocumentClient } from '../../../repository/dynamoDbClient';
import { IVoteRepository } from "../../../interface/IVoteRepository";
import { VoteRepository } from "../../../repository/voteRepository";
import { HandleVote } from "./handleVote";
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { EnvironmentHelper } from "../../../util/environmentHelper";

export const getDiContainer = () => {
    const container = new Container();
    container.bind(IVoteRepository).to(VoteRepository);
    container.bind(HandleVote).to(HandleVote);
    container.bind(IEnvironmentHelper).to(EnvironmentHelper);
    container.bind(DocumentClient).toConstantValue(GetDocumentClient());
    return container;
}
