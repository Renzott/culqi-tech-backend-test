import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONError } from "../libs/api-gateway";

const TOKEN_REGEX = /^pk_test_[a-zA-Z0-9]{16}$/;

export const validateTokenMiddleware = (handler) => async (event: APIGatewayProxyEvent) => {
    const authorizationHeader  = event.headers?.Authorization || '';
    const token = authorizationHeader.replace('Bearer ', '');

    if (!token || !token.match(TOKEN_REGEX)) {
        return formatJSONError(400, `Invalid token`);
    }
    return await handler(event);
}
    