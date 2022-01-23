import { EnvironmentVariable } from "../../../enum/environmentVariable";
import { tableName } from "./dynamoDbUtils";

export const initialiseEnvironmentVariables = () => {
    process.env[EnvironmentVariable.DynamoDbTableName] = tableName;
    process.env[EnvironmentVariable.SpotifyClientSecret] = 'fakeSecret';
    process.env[EnvironmentVariable.SpotifyRedirectUri] = 'http://some/url';
}
