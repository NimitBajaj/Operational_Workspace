import { Prisma } from "@prisma/client";

import { ProductRepository } from "./product.repository";
import { ProductCategoryRepository } from "../product-category/product-category.repository";

import {
    CreateProductInput,
    UpdateProductInput,
} from "./product.schema";

import { ConflictException } from "../../common/errors/conflict-error";
import { NotFoundException } from "../../common/errors/not-found-error";

export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productCategoryRepository: ProductCategoryRepository
    ) {}

    async create(data: CreateProductInput) {
        const existingProduct = await this.productRepository.findByName(data.name);

        if (existingProduct) {
            throw new ConflictException(
                `Product with name "${data.name}" already exists.`
            );
        }

        const category = await this.productCategoryRepository.findById(
            data.categoryId
        );

        if (!category) {
            throw new NotFoundException("Product category not found.");
        }

        const productData: Prisma.ProductCreateInput = {
            name: data.name,
            description: data.description,
            warranty: data.warranty,
            active: data.active,

            category: {
                connect: {
                    id: data.categoryId,
                },
            },
        };

        return this.productRepository.create(productData);
    }

    async findAll() {
        return this.productRepository.findAll();
    }

    async findById(id: string) {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(
                `Product with id "${id}" not found.`
            );
        }

        return product;
    }

    async update(id: string, data: UpdateProductInput) {
        const product = await this.findById(id);

        if (
            data.name &&
            data.name !== product.name
        ) {
            const existing = await this.productRepository.findByName(
                data.name
            );

            if (existing) {
                throw new ConflictException(
                    "Product with this name already exists."
                );
            }
        }

        const updateData: Prisma.ProductUpdateInput = {};

        if (data.name !== undefined) {
            updateData.name = data.name;
        }

        if (data.description !== undefined) {
            updateData.description = data.description;
        }

        if (data.warranty !== undefined) {
            updateData.warranty = data.warranty;
        }

        if (data.active !== undefined) {
            updateData.active = data.active;
        }

        if (data.categoryId !== undefined) {
            const category = await this.productCategoryRepository.findById(
                data.categoryId
            );

            if (!category) {
                throw new NotFoundException(
                    "Product category not found."
                );
            }

            updateData.category = {
                connect: {
                    id: data.categoryId,
                },
            };
        }

        return this.productRepository.update(id, updateData);
    }

    async delete(id: string) {
        await this.findById(id);

        return this.productRepository.delete(id);
    }
}