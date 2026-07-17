import { prisma } from "../../lib/prisma";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);


export const productController = new ProductController(productService);