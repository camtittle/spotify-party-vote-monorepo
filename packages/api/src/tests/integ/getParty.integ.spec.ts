import { StartRound } from "../../function/host/startRound/startRound";
import { testingDiContainer } from "./util/diContainer";
import { APIGatewayEvent } from "aws-lambda";
import { buildApiGatewayEvent } from "./util/lambdaUtils";
import { GetPartyResponse, StartRoundRequest, StartRoundResponse } from "@spotify-party-vote/core";
import { initialiseDatabase } from "./util/dynamoDbUtils";
import { initialiseEnvironmentVariables } from "./util/environmentUtil";
import { GetParty } from "../../function/guest/getParty/getParty";
import { expect } from "chai";

describe('startRound', () => {

    const getPartyHandler = testingDiContainer.get(GetParty).handler;
    const startRoundHandler = testingDiContainer.get(StartRound).handler;

    before(async function() {
        this.timeout(30000);
        initialiseEnvironmentVariables();
        await initialiseDatabase();
    });

    it('returns party from database', async () => {
        // Start a round for the party
        const body: StartRoundRequest = {
            partyId: 'testPartyId'
        };
        const createRequest: APIGatewayEvent = buildApiGatewayEvent().withBody(body);

        const startRoundHandlerResponse = await startRoundHandler(createRequest, undefined);
        const round = (JSON.parse(startRoundHandlerResponse.body) as StartRoundResponse).round;

        // Now get the party
        const request: APIGatewayEvent = buildApiGatewayEvent().withQueryParameters({
            partyId: 'testPartyId'
        })

        const response = await getPartyHandler(request, undefined);

        expect(response.statusCode).to.equal(200);

        const responseBody = JSON.parse(response.body) as GetPartyResponse;
        expect(responseBody.party.partyId).to.equal('testPartyId');
        expect(responseBody.party.activeRound.roundId).to.equal(round.roundId);
    });

});
