import { Prisma } from "@prisma/client";
import { ProductRepository } from "./product.repository";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(data: Prisma.ProductCreateInput) {
        const existingProduct = await this.productRepository.findByName(data.name);
        if (existingProduct) {
            throw new Error("Product with this name already exists");
        }

    return this.productRepository.create(data);
    }

}