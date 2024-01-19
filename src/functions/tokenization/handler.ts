import { ValidatedEventAPIGatewayProxyEvent, formatJSONError } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { encryptData } from '../../libs/crypto';
import { put } from '../../libs/dynamo';
import { validateTokenMiddleware } from '../../middleware/validateToken';
import { validateCard } from '../../common/validateBody';

const TOKEN_PREFIX = 'pk_test_';
const TOKEN_EXPIRATION_MINUTES = 15;

const TOKEN_LENGTH = 16;

const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < TOKEN_LENGTH; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

const tokenization: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const { body } = event;
    const { card_number, cvv, expiration_month, expiration_year, email } = body;

    if (!card_number || !cvv || !expiration_month || !expiration_year || !email) {
        return formatJSONError(400, `Missing parameters`);
    }

    if (!email.match(/^(.+)@(gmail\.com|hotmail\.com|yahoo\.es)$/)) {
        return formatJSONError(400, `Invalid email`);
    }

    const bodyValidation = validateCard(body);
    
    if (bodyValidation) {
        return bodyValidation;
    }

    const token = `${TOKEN_PREFIX}${generateToken()}`

    const data_encrypted = encryptData(JSON.stringify({
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email,
    }), token);

    const ttl_unix = Math.floor(Date.now() / 1000) + (TOKEN_EXPIRATION_MINUTES * 60);

    await put({
        token: token,
        data_encrypted,
        expiration: ttl_unix,
    });

    return formatJSONResponse({
        token: token,
        expiration: ttl_unix,
    });
}

export const main = validateTokenMiddleware(middyfy(tokenization));