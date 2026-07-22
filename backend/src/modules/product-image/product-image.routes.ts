import { Router } from "express"
import { validate } from "../../middleware/validation.middleware"
import { asyncHandler } from "../../utils/async-handler"
import { CreateProductImageSchema, UpdateProductImageSchema } from "./product-image.schema";
import { productImageController } from ".";

const router = Router();

router.post("/",
    validate(CreateProductImageSchema),
    asyncHandler((req,res,next) => productImageController.create(req,res))
);

router.get("/products/:id",
    asyncHandler((req,res,next) => productImageController.findByProduct(req,res)));
router.get("/:id", 
    asyncHandler((req,res,next) => productImageController.findById(req,res)));

router.patch("/:id",
    validate(UpdateProductImageSchema),
    asyncHandler((req,res,next) => productImageController.update(req,res)));

router.delete("./id",
    asyncHandler((req,res,next) => productImageController.delete(req,res)));

    export default router;