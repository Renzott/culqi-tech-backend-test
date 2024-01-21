import { formatJSONError } from "../libs/api-gateway";
import { luhnValidator } from "../libs/luhn-validator";
import { Card } from "../domain/card/Card";


const validateCard = (card: Card) => {
    
    const { card_number, ccv, expiration_month, expiration_year, email } = card;

    if (!card_number || !ccv || !expiration_month || !expiration_year || !email) {
        return formatJSONError(400, `Missing parameters`);
    }

    if (!card_number.toString().match(/^[0-9]{13,16}$/)) {
        return formatJSONError(400, `Invalid length card number`);
    }

    if (!luhnValidator(card_number)) {
        return formatJSONError(400, `Invalid card number (luhn algorithm)`);
    }

    if (!email.match(/^(.+)@(gmail\.com|hotmail\.com|yahoo\.es)$/)) {
        return formatJSONError(400, `Invalid email`);
    }

    if (!ccv.toString().match(/^[0-9]{3,4}$/)) {
        return formatJSONError(400, `Invalid length ccv`);
    }

    if (!expiration_month.toString().match(/^(0?[1-9]|1[0-2])$/)) {
        return formatJSONError(400, `Invalid expiration month`);
    }

    // Año actual máximo 5 años
    const current_year = new Date().getFullYear();
    if ( !expiration_year.toString().match(/^([0-9]{4})$/) && parseInt(expiration_year) > current_year + 5  || parseInt(expiration_year) < current_year ) {
        return formatJSONError(400, `Invalid expiration year`);
    }
    
}

export { validateCard }