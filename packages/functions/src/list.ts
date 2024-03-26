import dynamoDb from "@notes/core/dynamodb"
import handler from "@notes/core/handler"
import { Table } from "sst/node/table"

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    }
    const result = await dynamoDb.query(params)
    return JSON.stringify(result.Items)
})
