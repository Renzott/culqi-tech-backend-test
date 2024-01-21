export interface Card {
    card_number: number;
    ccv?: number;
    expiration_month: string;
    expiration_year: string;
    email: string;
    expiration_ttl?: number;
}