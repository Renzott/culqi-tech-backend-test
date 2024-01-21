import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Card } from "../../domain/card/Card";
import { CardRepository } from "../../domain/card/CardRepository";
import { dynamoDBClient } from "@libs/dynamo";
import { decryptData, encryptData } from "../../libs/crypto";
import { TOKEN_EXPIRATION_MINUTES } from "../../common/constants";


export class DynamoCardAdapter implements CardRepository {
    private readonly dynamoDB: DocumentClient;
    private readonly tableName: string;

    constructor(tableName: string) {
        this.dynamoDB = dynamoDBClient;
        this.tableName = tableName;
    }

    async save(card: Card, token: string): Promise<Card> {

        const cardString = JSON.stringify(card);

        const encryptedCard = encryptData(cardString, token);

        const ttl_unix = Math.floor(Date.now() / 1000) + (TOKEN_EXPIRATION_MINUTES * 60);
        card.expiration_ttl = ttl_unix;

        const params = {
            TableName: this.tableName,
            Item: {
                token_card: token,
                data_encrypted: encryptedCard,
                expiration_ttl: ttl_unix,
            }
        };

        await this.dynamoDB.put(params).promise();

        return Promise.resolve(card);
    }

    async getByToken(token: string): Promise<Card> {
        
        const params = {
            TableName: this.tableName,
            Key: {
                token_card: token
            }
        };

        const result = await this.dynamoDB.get(params).promise();

        if (!result.Item) {
            return null;
        }

        try{
            const decryptedData = decryptData(result.Item.data_encrypted, token);
            const card = JSON.parse(decryptedData) as Card;
            
            const { ccv, ...cardWithoutCCV } = card;

            return Promise.resolve(cardWithoutCCV);
        } catch (error) {
            return null;
        }
    }
}