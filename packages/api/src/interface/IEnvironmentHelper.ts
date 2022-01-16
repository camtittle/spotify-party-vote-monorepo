import { injectable } from "inversify";
import { EnvironmentVariable } from "../enum/environmentVariable";

@injectable()
export abstract class IEnvironmentHelper {
    abstract getEnvironmentVariable(key: EnvironmentVariable): string;
}