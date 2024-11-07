import { defineFunction } from '@aws-amplify/backend-function';
import { secret } from "@aws-amplify/backend";

const GPT_API_SECRET = secret('GPT_API_SECRET') ?? "";
const DYNAMODB_TABLE_NAME = secret('DYNAMODB_TABLE_NAME') ?? "";
const TABLE_NAME_LOCAL = secret('TABLE_NAME_LOCAL') ?? "";
const minutesFrequency = 20;

if (!GPT_API_SECRET) {
    throw new Error('GPT_API_SECRET is not defined');
}

if (!DYNAMODB_TABLE_NAME) {
    throw new Error('DYNAMODB_TABLE_NAME is not defined');
}

if (!TABLE_NAME_LOCAL) {
    throw new Error('TABLE_NAME_LOCAL is not defined');
}

export const bookScrapper = defineFunction({
    name: "bookScrapper",
    entry: "./handler.ts",
    schedule: `every ${minutesFrequency}m`,
    environment: {
        GPT_API_SECRET,
        DYNAMODB_TABLE_NAME,
        TABLE_NAME_LOCAL
    },
    timeoutSeconds: 120
})
