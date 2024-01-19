import { formatJSONError } from "../libs/api-gateway";
import { luhnValidator } from "../libs/luhn-validator";
import { Card } from "../models/Card";


const validateCard = (card: Card) => {
    
    const { card_number, cvv, expiration_month, expiration_year, email } = card;

    if (!card_number || !cvv || !expiration_month || !expiration_year || !email) {
        return formatJSONError(400, `Missing parameters`);
    }

    if (!email.match(/^(.+)@(gmail\.com|hotmail\.com|yahoo\.es)$/)) {
        return formatJSONError(400, `Invalid email`);
    }

    if (!luhnValidator(card_number)) {
        return formatJSONError(400, `Invalid card number`);
    }
    
}

export { validateCard }