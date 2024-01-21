import { Commerce } from "../domain/commerce/Commerce";
import { CommerceRepository } from "../domain/commerce/CommerceRepository";

export class CommerceService {
    constructor(private commerceRepository: CommerceRepository) {}

    async save(commerce: Commerce): Promise<Commerce> {
        return await this.commerceRepository.save(commerce);
    }

    async getById(id: string): Promise<Commerce> {
        return await this.commerceRepository.getById(id);
    }

}