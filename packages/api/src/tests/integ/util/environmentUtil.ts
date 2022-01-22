import { EnvironmentVariable } from "../../../enum/environmentVariable";
import { tableName } from "./dynamoDbUtils";

export const initialiseEnvironmentVariables = () => {
    process.env[EnvironmentVariable.DynamoDbTableName] = tableName;
}
