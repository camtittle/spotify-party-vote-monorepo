import { testingDiContainer } from "./util/diContainer";
import { APIGatewayEvent } from "aws-lambda";
import { buildApiGatewayEvent } from "./util/lambdaUtils";
import { CreateParty } from "../../function/host/createParty/createParty";
import { CreatePartyRequest, CreatePartyResponse } from "@spotify-party-vote/core";
import { initialiseEnvironmentVariables } from "./util/environmentUtil";

describe.only('getSpotifyToken', () => {

    const handler = testingDiContainer.get(CreateParty).handler;

    before(() => {
        initialiseEnvironmentVariables();
    })

    it('fetches token from spotify', async () => {
        // Start a round for the party
        const body: CreatePartyRequest = {
            code: 'testCode'
        };
        const request: APIGatewayEvent = buildApiGatewayEvent().withBody(body);

        const response = await handler(request, undefined);
        const credentials = JSON.parse(response.body) as CreatePartyResponse;
    });

});
