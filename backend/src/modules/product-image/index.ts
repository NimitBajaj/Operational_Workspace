import { prisma } from "../../lib/prisma";
import { ProductImageController } from "./product-image.controller";
import { ProductRepository } from "../product/product.repository";
import { ProductImageRepository } from "./product-image.repository";
import { ProductImageService } from "./product-image.service";
import { LocalStorageProvider } from "../../storage/local-storage.provider";
import { StorageService } from "../../storage/storage.service";

const productRepository = new ProductRepository(prisma);

const productImageRepository =
    new ProductImageRepository(prisma);

const storageProvider = new LocalStorageProvider();
const storageService = new StorageService(storageProvider);

const productImageService =
    new ProductImageService(
        productImageRepository,
        productRepository,
        storageService
    );

export const productImageController =
    new ProductImageController(productImageService);