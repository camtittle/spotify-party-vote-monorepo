import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { injectable } from "inversify";
import { getDiContainer } from "./finishRound.di";
import { ok } from "../../../util/responseHelper";

@injectable()
class FinishRound {

    constructor() {
    }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {

        // Get party

        // Mark round as complete

        // Mark track as played

        // Play on spotify

        return ok();
    }
}

const handler = getDiContainer().get(FinishRound).handler;

export { FinishRound, handler };
