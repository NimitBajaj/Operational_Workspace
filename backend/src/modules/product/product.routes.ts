import {Router} from 'express';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {ProductRepository} from './product.repository';
import { CreateProductSchema } from './product.schema';
import { validate } from '../../middleware/validation.middleware';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post("/", 
    validate(CreateProductSchema),
    asyncHandler((req, res, next) => productController.create(req, res))
);

export default router;

