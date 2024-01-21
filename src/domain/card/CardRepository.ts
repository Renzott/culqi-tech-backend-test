import { Card } from './Card'

export interface CardRepository {
    save(card: Card, token: string): Promise<Card>
    getByToken(token: string): Promise<Card>
}