import { SSTConfig } from "sst"
import { ApiStack } from "./stacks/ApiStack"
import { AuthStack } from "./stacks/AuthStack"
import { StorageStack } from "./stacks/StorageStack"

export default {
    config(_input) {
        return {
            name: "notes",
            region: "ap-southeast-2",
        }
    },
    stacks(app) {
        app.stack(StorageStack).stack(ApiStack).stack(AuthStack)
    },
} satisfies SSTConfig
