import {defineFunction} from "@aws-amplify/backend";

export const bookScrapper = defineFunction({
    name: "bookScrapper",
    entry: "./handler.ts",
    schedule: "every 2h"
})
