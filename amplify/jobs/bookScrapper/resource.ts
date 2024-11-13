import { defineFunction } from '@aws-amplify/backend-function';
import { secret } from "@aws-amplify/backend";

const GPT_API_SECRET = secret('GPT_API_SECRET') ?? "";
const DYNAMODB_TABLE_NAME = secret('DYNAMODB_TABLE_NAME') ?? "";
const minutesFrequency = 15;

if (!GPT_API_SECRET) {
    throw new Error('GPT_API_SECRET is not defined');
}

if (!DYNAMODB_TABLE_NAME) {
    throw new Error('DYNAMODB_TABLE_NAME is not defined');
}

export const bookScrapper = defineFunction({
    name: "bookScrapper",
    entry: "./handler.ts",
    schedule: `every ${minutesFrequency}m`,
    environment: {
        GPT_API_SECRET,
        DYNAMODB_TABLE_NAME
    },
    timeoutSeconds: 120
})
