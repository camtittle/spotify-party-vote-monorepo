import { Container } from "inversify";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetDocumentClient } from '../../../repository/dynamoDbClient';
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { EnvironmentHelper } from "../../../util/environmentHelper";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { PartyRepository } from "../../../repository/partyRepository";
import { ISpotifyService } from "../../../interface/ISpotifyService";
import { SpotifyService } from "../../../service/spotifyService";
import { CreateParty } from "./createParty";

export const getDiContainer = () => {
    const container = new Container();
    container.bind(CreateParty).to(CreateParty);
    container.bind(IPartyRepository).to(PartyRepository);
    container.bind(ISpotifyService).to(SpotifyService);
    container.bind(IEnvironmentHelper).to(EnvironmentHelper);
    container.bind(DocumentClient).toConstantValue(GetDocumentClient());
    return container;
}
