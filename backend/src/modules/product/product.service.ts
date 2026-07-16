import { Prisma } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import { ConflictException } from "../../common/errors/conflict-error";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(data: Prisma.ProductCreateInput) {
        const existingProduct = await this.productRepository.findByName(data.name);
        if (existingProduct) {
            throw new ConflictException(`Product with name "${data.name}" already exists.`);
        }

    return this.productRepository.create(data);
    }

}