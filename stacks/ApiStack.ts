import { Api, StackContext, use } from "sst/constructs"
import { StorageStack } from "./StorageStack"

export function ApiStack({ stack }: StackContext) {
    const { table } = use(StorageStack)

    const api = new Api(stack, "Api", {
        defaults: {
            authorizer: "iam",
            function: {
                bind: [table],
            },
        },
        routes: {
            "GET /notes": "packages/functions/src/list.main",
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main",
        },
    })

    stack.addOutputs({
        ApiEndpoint: api.url,
    })

    return {
        api,
    }
}
