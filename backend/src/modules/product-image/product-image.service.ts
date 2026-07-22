import { Prisma } from "@prisma/client";

import { ProductImageRepository } from "./product-image.repository";
import { ProductRepository } from "../product/product.repository";

import {
    CreateProductImageInput,
    UpdateProductImageInput,
} from "./product-image.schema";

import { NotFoundException } from "../../common/errors/not-found-error";

export class ProductImageService {
    constructor(
        private readonly productImageRepository: ProductImageRepository,
        private readonly productRepository: ProductRepository
    ) {}

    async create(data: CreateProductImageInput) {
        const product = await this.productRepository.findById(data.productId);

        if (!product) {
            throw new NotFoundException("Product not found.");
        }

        if (data.isPrimary) {
            await this.productImageRepository.clearPrimary(data.productId);
        }

        const imageData: Prisma.ProductImageCreateInput = {
            storageKey: data.storageKey,
            imageUrl: data.imageUrl,
            altText: data.altText,
            isPrimary: data.isPrimary ?? false,
            sortOrder: data.sortOrder ?? 0,

            product: {
                connect: {
                    id: data.productId,
                },
            },
        };

        return this.productImageRepository.create(imageData);
    }

    async findByProduct(productId: string) {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new NotFoundException("Product not found.");
        }

        return this.productImageRepository.findByProduct(productId);
    }

    async findById(id: string) {
        const image = await this.productImageRepository.findById(id);

        if (!image) {
            throw new NotFoundException("Product image not found.");
        }

        return image;
    }

    async update(id: string, data: UpdateProductImageInput) {
        const image = await this.findById(id);

        const updateData: Prisma.ProductImageUpdateInput = {};

        if (data.storageKey !== undefined) {
            updateData.storageKey = data.storageKey;
        }

        if (data.imageUrl !== undefined) {
            updateData.imageUrl = data.imageUrl;
        }

        if (data.altText !== undefined) {
            updateData.altText = data.altText;
        }

        if (data.sortOrder !== undefined) {
            updateData.sortOrder = data.sortOrder;
        }

        if (data.isPrimary !== undefined) {
            if (data.isPrimary) {
                await this.productImageRepository.clearPrimary(
                    image.productId
                );
            }

            updateData.isPrimary = data.isPrimary;
        }

        return this.productImageRepository.update(id, updateData);
    }

    async delete(id: string) {
        await this.findById(id);

        return this.productImageRepository.delete(id);
    }
}