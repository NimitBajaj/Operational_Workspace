import { Prisma } from "@prisma/client";

import { ProductVariantRepository } from "./product-variant.repository";
import { ProductRepository } from "../product/product.repository";

import {
    CreateProductVariantInput,
    UpdateProductVariantInput,
} from "./product-variant.schema";

import { ConflictException } from "../../common/errors/conflict-error";
import { NotFoundException } from "../../common/errors/not-found-error";

export class ProductVariantService {
    constructor(
        private readonly productVariantRepository: ProductVariantRepository,
        private readonly productRepository: ProductRepository
    ) {}

    async create(data: CreateProductVariantInput) {
    const product = await this.productRepository.findById(data.productId);

    if (!product) {
        throw new NotFoundException(
            `Product with id "${data.productId}" not found.`
        );
    }

    if (data.sku) {
        const existingSku = await this.productVariantRepository.findBySku(data.sku);

        if (existingSku) {
            throw new ConflictException(
                `Product variant with SKU "${data.sku}" already exists.`
            );
        }
    }

    const createData: Prisma.ProductVariantCreateInput = {
        sku: data.sku,
        wattage: data.wattage,
        colorTemperature: data.colorTemperature,
        finish: data.finish,
        beamAngle: data.beamAngle,
        cutout: data.cutout,
        dimensions: data.dimensions,
        voltage: data.voltage,
        ipRating: data.ipRating,
        cri: data.cri,
        supplierCode: data.supplierCode,

        costPrice: data.costPrice,
        sellingPrice: data.sellingPrice,
        mrp: data.mrp,
        gstPercent: data.gstPercent,

        stockQuantity: data.stockQuantity ?? 0,
        active: data.active ?? true,

        product: {
            connect: {
                id: data.productId,
            },
        },
    };

    return this.productVariantRepository.create(createData);
}

async findAll() {
    return this.productVariantRepository.findAll();
}

async findById(id: string) {
    const variant = await this.productVariantRepository.findById(id);

    if (!variant) {
        throw new NotFoundException(
            `Product variant with id "${id}" not found.`
        );
    }

    return variant;
}

async update(id: string, data: UpdateProductVariantInput) {
    await this.findById(id);

    const updateData: Prisma.ProductVariantUpdateInput = {};

    if (data.productId) {
        const product = await this.productRepository.findById(data.productId);

        if (!product) {
            throw new NotFoundException(
                `Product with id "${data.productId}" not found.`
            );
        }

        updateData.product = {
            connect: {
                id: data.productId,
            },
        };
    }

    if (data.sku) {
        const existingSku = await this.productVariantRepository.findBySku(data.sku);

        if (existingSku && existingSku.id !== id) {
            throw new ConflictException(
                `Product variant with SKU "${data.sku}" already exists.`
            );
        }

        updateData.sku = data.sku;
    }

    if (data.wattage !== undefined) updateData.wattage = data.wattage;
    if (data.colorTemperature !== undefined) updateData.colorTemperature = data.colorTemperature;
    if (data.finish !== undefined) updateData.finish = data.finish;
    if (data.beamAngle !== undefined) updateData.beamAngle = data.beamAngle;
    if (data.cutout !== undefined) updateData.cutout = data.cutout;
    if (data.dimensions !== undefined) updateData.dimensions = data.dimensions;
    if (data.voltage !== undefined) updateData.voltage = data.voltage;
    if (data.ipRating !== undefined) updateData.ipRating = data.ipRating;
    if (data.cri !== undefined) updateData.cri = data.cri;
    if (data.supplierCode !== undefined) updateData.supplierCode = data.supplierCode;

    if (data.costPrice !== undefined) updateData.costPrice = data.costPrice;
    if (data.sellingPrice !== undefined) updateData.sellingPrice = data.sellingPrice;
    if (data.mrp !== undefined) updateData.mrp = data.mrp;
    if (data.gstPercent !== undefined) updateData.gstPercent = data.gstPercent;

    if (data.stockQuantity !== undefined) updateData.stockQuantity = data.stockQuantity;
    if (data.active !== undefined) updateData.active = data.active;

    return this.productVariantRepository.update(id, updateData);
}

async delete(id: string) {
    await this.findById(id);

    return this.productVariantRepository.delete(id);
}


}

