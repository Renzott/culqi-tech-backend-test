import { Card } from "../domain/card/Card"
import { CardRepository } from "../domain/card/CardRepository"

export class CardService {
    constructor(private cardRepository: CardRepository) {}

    async save(card: Card, token: string): Promise<Card> {
        return this.cardRepository.save(card, token);
    }

    async getByToken(token: string): Promise<Card> {
        return this.cardRepository.getByToken(token);
    }

}