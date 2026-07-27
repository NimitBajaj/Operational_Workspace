import { prisma } from "../../lib/prisma";

import { ProductRepository } from "../product/product.repository";

import { ProductVariantRepository } from "./product-variant.repository";
import { ProductVariantService } from "./product-variant.service";
import { ProductVariantController } from "./product-variant.controller";

const productRepository = new ProductRepository(prisma);

const productVariantRepository = new ProductVariantRepository(prisma);

const productVariantService = new ProductVariantService(
    productVariantRepository,
    productRepository
);

export const productVariantController =
    new ProductVariantController(productVariantService);