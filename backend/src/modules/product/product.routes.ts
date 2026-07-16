import {Router} from 'express';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {ProductRepository} from './product.repository';

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post("/", productController.create.bind(productController));

export default router;

