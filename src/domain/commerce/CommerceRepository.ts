import { Commerce } from "./Commerce";

export interface CommerceRepository {
    save(commerce: Commerce): Promise<Commerce>
    getById(id: string): Promise<Commerce>
}