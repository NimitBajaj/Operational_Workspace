import { prisma } from "../../lib/prisma";

import { ProductRepository } from "../product/product.repository";
import { ProductCategoryRepository } from "../product-category/product-category.repository";

import { CatalogueService } from "./catalogue.service";
import { CatalogueController } from "./catalogue.controller";

const productRepository =
    new ProductRepository(prisma);

const categoryRepository =
    new ProductCategoryRepository(prisma);

const catalogueService =
    new CatalogueService(
        productRepository,
        categoryRepository
    );

export const catalogueController =
    new CatalogueController(
        catalogueService
    );