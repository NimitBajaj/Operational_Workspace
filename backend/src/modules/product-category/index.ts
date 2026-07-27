import { prisma } from "../../lib/prisma";
import { ProductCategoryController } from "./product-category.controller";
import { ProductCategoryRepository } from "./product-category.repository";
import { ProductCategoryService } from "./product-category.service";

const repository =
    new ProductCategoryRepository(prisma);

const service =
    new ProductCategoryService(repository);

export const productCategoryController = new ProductCategoryController(service);