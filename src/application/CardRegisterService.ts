import { CardRegister } from "../domain/cardRegister/CardRegister";
import { CardRegisterRepository } from "../domain/cardRegister/CardRegisterRepository"


export class CardRegisterService {
    constructor( private cardRegisterRepository: CardRegisterRepository) {}

    async save(cardRegister: CardRegister): Promise<void> {
        return this.cardRegisterRepository.save(cardRegister);
    }

    async getByRegister_pk(register_pk: string): Promise<CardRegister> {
        return this.cardRegisterRepository.getByRegister_pk(register_pk);
    }
}