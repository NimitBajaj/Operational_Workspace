import { ProductCategoryRepository } from "./product-category.repository";
import { CreateProductCategoryInput, UpdateProductCategoryInput } from "./product-category.schema";
import { ConflictException } from "../../common/errors/conflict-error";
import { NotFoundException } from "../../common/errors/not-found-error";

export class ProductCategoryService {
    constructor(
        private readonly productCategoryRepository: ProductCategoryRepository
    ) {}

    async create(data: CreateProductCategoryInput) {

    const existingName =
        await this.productCategoryRepository.findByName(data.name);

    if (existingName) {
        throw new ConflictException(
            `Category with name "${data.name}" already exists.`
        );
    }

    const existingSlug =
        await this.productCategoryRepository.findBySlug(data.slug);

    if (existingSlug) {
        throw new ConflictException(
            `Category with slug "${data.slug}" already exists.`
        );
    }

    return this.productCategoryRepository.create(data);
}

async getAll() {
    return this.productCategoryRepository.findAll();
}

async getById(id: string) {

    const category =
        await this.productCategoryRepository.findById(id);

    if (!category) {
        throw new NotFoundException(
            `Product Category "${id}" not found.`
        );
    }

    return category;
}

async update(
    id: string,
    data: UpdateProductCategoryInput
) {

    await this.getById(id);

    if (data.name) {

        const existing =
            await this.productCategoryRepository.findByName(data.name);

        if (existing && existing.id !== id) {
            throw new ConflictException(
                `Category with name "${data.name}" already exists.`
            );
        }
    }

    if (data.slug) {

        const existing =
            await this.productCategoryRepository.findBySlug(data.slug);

        if (existing && existing.id !== id) {
            throw new ConflictException(
                `Category with slug "${data.slug}" already exists.`
            );
        }
    }

    return this.productCategoryRepository.update(id, data);
}

async delete(id: string) {

    await this.getById(id);

    return this.productCategoryRepository.delete(id);
}


}