import { Container } from "inversify";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetDocumentClient } from '../../../repository/dynamoDbClient';
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { EnvironmentHelper } from "../../../util/environmentHelper";
import { GetParty } from "./getParty";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { PartyRepository } from "../../../repository/partyRepository";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { RoundRepository } from "../../../repository/roundRepository";

export const getDiContainer = () => {
    const container = new Container();
    container.bind(IPartyRepository).to(PartyRepository);
    container.bind(IRoundRepository).to(RoundRepository);
    container.bind(IEnvironmentHelper).to(EnvironmentHelper);
    container.bind(DocumentClient).toConstantValue(GetDocumentClient());
    container.bind(GetParty).to(GetParty);
    return container;
}
