import {Router} from 'express';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';
import { validate } from '../../middleware/validation.middleware';
import { asyncHandler } from '../../utils/async-handler';
import { productController } from '.';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/authorize.middleware';


const router = Router();

router.post("/", 
    authenticate,
    authorize("ADMIN"),
    validate(CreateProductSchema),
    asyncHandler((req, res, next) => productController.create(req, res))
);

router.get("/",
     authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res, next) => productController.findAll(req,res))
);

router.get("/:id", 
    authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req,res,next) => productController.findById(req,res))
);

router.patch("/:id",
    authenticate,
    authorize("ADMIN"),
    validate(UpdateProductSchema),
    asyncHandler((req,res,next) => 
    productController.update(req,res))
);

router.delete("/:id",
    authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req,res,next) => 
    productController.delete(req,res))
)

export default router;

