import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { dynamoDBClient } from "../../libs/dynamo";
import { CommerceRepository } from "../../domain/commerce/CommerceRepository";
import { Commerce } from "../../domain/commerce/Commerce";

export class DynamoCommerceAdapter implements CommerceRepository {
    private dynamoDB: DocumentClient;
    private tableName: string;

    constructor(tableName: string) {
        this.dynamoDB = dynamoDBClient;
        this.tableName = tableName;
    }

    async getById(id: string): Promise<Commerce> {
        const params = {
            TableName: this.tableName,
            Key: {
                commerce_pk: id
            }
        };

        const result = await this.dynamoDB.get(params).promise();

        if (!result.Item) {
            return null;
        }

        return result.Item as Commerce;
    }

    async save(commerce: Commerce): Promise<Commerce> {
        const params = {
            TableName: this.tableName,
            Item: {
                ...commerce,
            }
        }

        await this.dynamoDB.put(params).promise();
        return commerce;
    }

}