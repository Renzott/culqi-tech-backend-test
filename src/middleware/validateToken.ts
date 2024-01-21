import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONError } from "../libs/api-gateway";
import { DynamoCommerceAdapter } from "../infrastructure/dynamodb/DynamoCommercerAdapter";
import dynamoTablesName from "../common/dynamo/dynamoTablesName";
import { CommerceService } from "../application/CommerceService";

const TOKEN_REGEX = /^pk_test_[a-zA-Z0-9]{16}$/;

export const validateTokenMiddleware = (handler) => async (event: APIGatewayProxyEvent) => {
    const authorizationHeader  = event.headers?.Authorization || '';
    const token = authorizationHeader.replace('Bearer ', '');

    if (!token || !token.match(TOKEN_REGEX)) {
        return formatJSONError(400, `Invalid token`);
    }

    const commerceRepository = new DynamoCommerceAdapter(dynamoTablesName.commerceTable);
    const commerceService = new CommerceService(commerceRepository);
    
    const commerce = await commerceService.getById(token);

    if (!commerce) {
        return formatJSONError(401, `Unauthorized`);
    }

    return await handler(event);
}

const CARD_TOKEN_REGEX = /^[a-zA-Z0-9]{16}$/;

export const validateCardTokenMiddleware = (handler) => async (event: APIGatewayProxyEvent) => {
    const authorizationHeader  = event.headers?.Authorization || '';
    const token = authorizationHeader.replace('Bearer ', '');

    if (!token || !token.match(CARD_TOKEN_REGEX)) {
        return formatJSONError(400, `Invalid token`);
    }

    return await handler(event);
}

    