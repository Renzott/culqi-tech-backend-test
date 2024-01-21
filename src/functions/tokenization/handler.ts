import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { validateTokenMiddleware } from '../../middleware/validateToken';
import { validateCard } from '../../common/validateBody';
import { DynamoCardAdapter } from '../../infrastructure/dynamodb/DynamoCardAdapter';
import dynamoTablesName from '../../common/dynamo/dynamoTablesName';
import { CardService } from '../../application/CardService';
import { generateToken } from '../../libs/tokenGenerator';
import { DynamoCardRegisterAdapter } from '../../infrastructure/dynamodb/DynamoCardRegisterAdapter';
import { CardRegisterService } from '../../application/CardRegisterService';

const tokenization: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const { body } = event;
    const card_token = generateToken();

    const bodyValidation = validateCard(body);
    
    if (bodyValidation) {
        return bodyValidation;
    }

    const cardRepository = new DynamoCardAdapter(dynamoTablesName.tokenTable);
    const cardService = new CardService(cardRepository);
    
    const card = await cardService.save(body, card_token);


    const cardRegisterRepository = new DynamoCardRegisterAdapter(dynamoTablesName.registerCardTable);
    const cardRegisterService = new CardRegisterService(cardRegisterRepository);

    await cardRegisterService.save({
        register_pk: card_token,
        expiration_ttl: card.expiration_ttl || 0,
    });

    return formatJSONResponse({
        token: card_token,
        expiration: card.expiration_ttl || 0,
    });
}

export const main = validateTokenMiddleware(middyfy(tokenization));