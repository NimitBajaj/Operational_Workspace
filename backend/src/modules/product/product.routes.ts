import {Router} from 'express';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';
import { validate } from '../../middleware/validation.middleware';
import { asyncHandler } from '../../utils/async-handler';
import { productController } from '.';


const router = Router();

router.post("/", 
    validate(CreateProductSchema),
    asyncHandler((req, res, next) => productController.create(req, res))
);

router.get("/",
    asyncHandler((req, res, next) => productController.findAll(req,res))
);

router.get("/:id", 
    asyncHandler((req,res,next) => productController.findById(req,res))
);

router.patch("/:id",
    validate(UpdateProductSchema),
    asyncHandler((req,res,next) => 
    productController.update(req,res))
);

router.delete("/:id",
    asyncHandler((req,res,next) => 
    productController.delete(req,res))
)

export default router;

