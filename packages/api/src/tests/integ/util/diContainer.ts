import 'reflect-metadata';
import { Container } from "inversify";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { localDocumentClient } from "./dynamoDbLocalClient";
import { RoundRepository } from "../../../repository/roundRepository";
import { PartyRepository } from "../../../repository/partyRepository";
import { VoteRepository } from "../../../repository/voteRepository";
import { StartRound } from "../../../function/host/startRound/startRound";
import { IVoteRepository } from "../../../interface/IVoteRepository";
import { IPartyRepository } from "../../../interface/IPartyRepository";
import { EnvironmentHelper } from "../../../util/environmentHelper";
import { ITrackRepository } from "../../../interface/ITrackRepository";
import { IEnvironmentHelper } from "../../../interface/IEnvironmentHelper";
import { IRoundRepository } from "../../../interface/IRoundRepository";
import { TrackRepository } from "../../../repository/trackRepository";
import { GetParty } from "../../../function/guest/getParty/getParty";


const container = new Container();

// Controllers
container.bind(StartRound).to(StartRound);
container.bind(GetParty).to(GetParty);

// Repos
container.bind(IVoteRepository).to(VoteRepository);
container.bind(IRoundRepository).to(RoundRepository);
container.bind(ITrackRepository).to(TrackRepository);
container.bind(IPartyRepository).to(PartyRepository);

// Misc
container.bind(IEnvironmentHelper).to(EnvironmentHelper);
container.bind(DocumentClient).toConstantValue(localDocumentClient);


export { container as testingDiContainer };
