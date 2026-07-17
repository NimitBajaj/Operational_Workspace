import { Prisma } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import { ConflictException } from "../../common/errors/conflict-error";
import { NotFoundException } from "../../common/errors/not-found-error";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(data: Prisma.ProductCreateInput) {
        const existingProduct = await this.productRepository.findByName(data.name);
        if (existingProduct) {
            throw new ConflictException(`Product with name "${data.name}" already exists.`);
        }

    return this.productRepository.create(data);
    }

    async findAll() {
        return this.productRepository.findAll();
    }

    async findById(id: string) {
        const product = await this.productRepository.findById(id);

        if(!product) {
            throw new NotFoundException('Prouct with i "${id}" not found.');
        }
        return product;
    }

    async update(id: string, data: Prisma.ProductUpdateInput) {
        const product = await this.findById(id);

        if(data.name && data.name !== product.name) {
            const existing = await this.productRepository.findByName(
                data.name as string
            );

            if(existing) {
                throw new ConflictException(
                    'Product with this name already exsts.'
                );
            }
        }
        return this.productRepository.update(id,data);
    }

    async delete(id: string) {
        await this.findById(id);

        return this.productRepository.delete(id);
    }
}