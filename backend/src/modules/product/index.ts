import { prisma } from "../../lib/prisma";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { ProductCategoryRepository } from "../product-category/product-category.repository";


const productRepository = new ProductRepository(prisma);
const productCategoryRepository = new ProductCategoryRepository(prisma);
const productService = new ProductService(productRepository, productCategoryRepository);


export const productController = new ProductController(productService);