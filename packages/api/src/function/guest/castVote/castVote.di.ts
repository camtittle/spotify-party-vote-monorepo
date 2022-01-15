import 'reflect-metadata';
import { Container } from "inversify";
import { IPartyRepository } from "../../../interfaces/iPartyRepository";
import { PartyRepository } from "../../../repository/partyRepository";
import { CastVoteController } from "./castVote";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetDocumentClient } from '../../../repository/dynamoDbClient';

const container = new Container();
container.bind(IPartyRepository).to(PartyRepository);
container.bind(CastVoteController).to(CastVoteController);
container.bind(DocumentClient).toConstantValue(GetDocumentClient());

export { container };