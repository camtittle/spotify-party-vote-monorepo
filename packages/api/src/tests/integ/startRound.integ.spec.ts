import { StartRound } from "../../function/host/startRound/startRound";
import {testingDiContainer } from "./util/diContainer";
import { APIGatewayEvent } from "aws-lambda";
import { buildApiGatewayEvent } from "./util/lambdaUtils";
import { StartRoundRequest, StartRoundResponse } from "@spotify-party-vote/core";
import { localDocumentClient } from "./util/dynamoDbLocalClient";
import { initialiseDatabase, purgeDatabase, tableName } from "./util/dynamoDbUtils";
import { initialiseEnvironmentVariables } from "./util/environmentUtil";
import { expect } from 'chai';
import { BaseItem } from "../../model/entity/baseItem";
import { RoundEntity } from "../../model/entity/round";
import { PartyEntity } from "../../model/entity/party";

describe('startRound', () => {

    const handler = testingDiContainer.get(StartRound).handler;

    before(async function() {
        this.timeout(30000);
        initialiseEnvironmentVariables();
        await initialiseDatabase();
    });

    it('creates required entities in database', async () => {
        const body: StartRoundRequest = {
            partyId: 'testPartyId'
        };
        const request: APIGatewayEvent = buildApiGatewayEvent().withBody(body);

        const response = await handler(request, undefined) ;

        // Verify database contains correct items
        const items: BaseItem[] = <any>(await localDocumentClient.scan({ TableName: tableName }).promise()).Items;

        // Correct items types are created in DB
        expect(items).to.have.length(5);
        expect(items.filter(x => x.partitionKey.startsWith('PARTY'))).to.have.length(1);
        expect(items.filter(x => x.partitionKey.startsWith('ROUND'))).to.have.length(1);
        expect(items.filter(x => x.partitionKey.startsWith('VOTE'))).to.have.length(3);


        // Response matches ROUND item
        const responseBody = (JSON.parse(response.body) as StartRoundResponse).round;
        const roundDbItem = items.filter(x => x.partitionKey.startsWith('ROUND'))[0] as RoundEntity;
        expect(responseBody.roundId).to.equal(roundDbItem.roundId);
        expect(responseBody.partyId).to.equal(roundDbItem.partyId);

        // Party has current round set
        const partyDbItem = items.filter(x => x.partitionKey.startsWith('PARTY'))[0] as PartyEntity;
        expect(partyDbItem.activeRoundId).to.equal(roundDbItem.roundId);
    });

});
