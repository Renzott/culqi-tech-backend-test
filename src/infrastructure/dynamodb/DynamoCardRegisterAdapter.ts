import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { CardRegister } from "../../domain/cardRegister/CardRegister";
import { CardRegisterRepository } from "../../domain/cardRegister/CardRegisterRepository";
import { dynamoDBClient } from "../../libs/dynamo";

export class DynamoCardRegisterAdapter implements CardRegisterRepository {

    private readonly dynamoClient: DocumentClient;
    private readonly tableName: string;

    constructor(tableName: string) {
        this.dynamoClient = dynamoDBClient;
        this.tableName = tableName;
    }

    async save(cardRegister: CardRegister): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                ...cardRegister
            }
        };

        await this.dynamoClient.put(params).promise();
    }

    async getByRegister_pk(register_pk: string): Promise<CardRegister> {
        const params = {
            TableName: this.tableName,
            Key: {
                register_pk
            }
        };

        const result = await this.dynamoClient.get(params).promise();

        if (!result.Item) {
            return null;
        }

        return result.Item as CardRegister;
    }
    
}