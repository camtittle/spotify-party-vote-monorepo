import { Container } from "inversify";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { GetDocumentClient } from '../../../repository/dynamoDbClient';
import { IVoteRepository } from "../../../interface/IVoteRepository";
import { VoteRepository } from "../../../repository/voteRepository";
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { EnvironmentHelper } from "../../../util/environmentHelper";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { RoundRepository } from "../../../repository/roundRepository";
import { ITrackRepository } from "../../../interface/ITrackRepository";
import { TrackRepository } from "../../../repository/trackRepository";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { PartyRepository } from "../../../repository/partyRepository";
import { FinishRound } from "./finishRound";
import { ISpotifyService } from "../../../interface/ISpotifyService";
import { SpotifyService } from "../../../service/spotifyService";

export const getDiContainer = () => {
    const container = new Container();
    container.bind(FinishRound).to(FinishRound);
    container.bind(IVoteRepository).to(VoteRepository);
    container.bind(IRoundRepository).to(RoundRepository);
    container.bind(ITrackRepository).to(TrackRepository);
    container.bind(IPartyRepository).to(PartyRepository);
    container.bind(ISpotifyService).to(SpotifyService);
    container.bind(IEnvironmentHelper).to(EnvironmentHelper);
    container.bind(DocumentClient).toConstantValue(GetDocumentClient());
    return container;
}
