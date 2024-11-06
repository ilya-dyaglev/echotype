import { defineFunction } from '@aws-amplify/backend-function';
export const bookScrapper = defineFunction({
    name: "bookScrapper",
    entry: "./handler.ts",
    schedule: "every 2h",
})
