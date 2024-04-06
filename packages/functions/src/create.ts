import dynamoDb from "@notes/core/dynamodb"
import handler from "@notes/core/handler"
import { Table } from "sst/node/table"
import * as uuid from "uuid"

export const main = handler(async (event) => {
    let data = {
        content: "",
        attachment: "",
    }

    if (event.body != null) {
        data = JSON.parse(event.body)
    }

    const params = {
        TableName: Table.Notes.tableName,
        Item: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
            noteId: uuid.v1(), // A unique uuid
            content: data.content, // Parsed from request body
            attachment: data.attachment, // Parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    }

    await dynamoDb.put(params)

    return JSON.stringify(params.Item)
})
