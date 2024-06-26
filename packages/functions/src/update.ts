import dynamoDb from "@notes/core/dynamodb"
import handler from "@notes/core/handler"
import { Table } from "sst/node/table"

export const main = handler(async (event) => {
    const data = JSON.parse(event.body || "{}")

    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity
                .identityId,
            noteId: event?.pathParameters?.id,
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
        ReturnValues: "ALL_NEW",
    }
    await dynamoDb.update(params)

    return JSON.stringify({ status: true })
})
