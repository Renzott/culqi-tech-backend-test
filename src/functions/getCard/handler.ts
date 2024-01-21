import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONError, formatJSONResponse } from "../../libs/api-gateway";
import { DynamoCardAdapter } from "../../infrastructure/dynamodb/DynamoCardAdapter";
import { CardService } from "../../application/CardService";
import dynamoTablesName from "../../common/dynamo/dynamoTablesName";
import { middyfy } from "../../libs/lambda";
import { CardRegisterService } from "../../application/CardRegisterService";
import { DynamoCardRegisterAdapter } from "../../infrastructure/dynamodb/DynamoCardRegisterAdapter";
import { validateCardTokenMiddleware } from "../../middleware/validateToken";

const getCard = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const token = event.headers?.Authorization?.replace('Bearer ', '');

    if (!token) {
        return formatJSONError(400, `Missing token`);
    }

    const cardRepository = new DynamoCardAdapter(dynamoTablesName.tokenTable);
    const cardService = new CardService(cardRepository);

    const cardRegisterRepository = new DynamoCardRegisterAdapter(dynamoTablesName.registerCardTable);
    const cardRegisterService = new CardRegisterService(cardRegisterRepository);

    const findCard = await cardRegisterService.getByRegister_pk(token);

    if (!findCard) {
        return formatJSONError(404, 'Card not found');
    }
    const dateNow = Math.floor(Date.now() / 1000);

    if (findCard.expiration_ttl < dateNow) {
        return formatJSONError(401, 'Card expired');
    }

    const card = await cardService.getByToken(token);

    if (!card) {
        return formatJSONError(404, 'Card Register but not found or error in decrypt');
    }

    return formatJSONResponse({
        ...card
    });
}


export const main = validateCardTokenMiddleware(middyfy(getCard));