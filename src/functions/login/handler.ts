import { ValidatedEventAPIGatewayProxyEvent, formatJSONError } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { TOKEN_PREFIX } from '../../common/constants';
import { generateToken } from '../../libs/tokenGenerator';
import dynamoTablesName from '../../common/dynamo/dynamoTablesName';
import { DynamoCommerceAdapter } from '../../infrastructure/dynamodb/DynamoCommercerAdapter';
import { CommerceService } from '../../application/CommerceService';

const USERNAME = 'culqi';
const PASSWORD = 'strongpassword';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const { body } = event;
    const { username, password } = body;

    if (!username || !password) {
        return formatJSONError(400, `Missing parameters`);
    }

    if (username !== USERNAME || password !== PASSWORD) {
        return formatJSONError(401, `Invalid credentials`);
    }

    const token = `${TOKEN_PREFIX}${generateToken()}`

    const commerceRepository = new DynamoCommerceAdapter(dynamoTablesName.commerceTable);
    const commerceService = new CommerceService(commerceRepository);

    await commerceService.save({ commerce_pk: token });

    return formatJSONResponse({
        token
    });
}

export const main = middyfy(login);