import { CardRegister } from "./CardRegister"

export interface CardRegisterRepository {
    save(cardRegister: CardRegister): Promise<void>
    getByRegister_pk(register_pk: string): Promise<CardRegister>
}