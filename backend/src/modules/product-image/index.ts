import { prisma } from "../../lib/prisma";
import { ProductImageController } from "./product-image.controller";
import { ProductRepository } from "../product/product.repository";
import { ProductImageRepository } from "./product-image.repository";
import { ProductImageService } from "./product-image.service";

const productRepository = new ProductRepository(prisma);

const productImageRepository =
    new ProductImageRepository(prisma);

const productImageService =
    new ProductImageService(
        productImageRepository,
        productRepository
    );

export const productImageController =
    new ProductImageController(productImageService);