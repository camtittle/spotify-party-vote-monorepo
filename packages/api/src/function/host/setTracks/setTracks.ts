import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { ok } from "../../../util/responseHelper";
import { inject, injectable } from "inversify";
import { getDiContainer } from "./setTracks.di";
import { ITrackRepository } from "../../../interface/ITrackRepository";
import { SetTracksRequest } from "@spotify-party-vote/core";

@injectable()
class SetTracks {

    constructor(@inject(ITrackRepository) private trackRepository: ITrackRepository) {
    }

    // private validRequest(body: any): body is SetTracksRequest {
    //
    // }

    public handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {

        const tracks = JSON.parse(event.body);

        return ok();
    }

}

const handler = getDiContainer().get(SetTracks).handler;

export { SetTracks, handler }

