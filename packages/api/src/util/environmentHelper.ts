import { injectable } from "inversify";
import { EnvironmentVariable } from "../enum/environmentVariable";
import { IEnvironmentHelper } from "../interface/IEnvironmentHelper";

@injectable()
export class EnvironmentHelper extends IEnvironmentHelper {
    getEnvironmentVariable = (key: EnvironmentVariable) => {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Cannot find environment variable for key ${key}`);
        }
    
        return value as string;
    }
}