import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";
import { asyncHandler } from "../../utils/async-handler";

import {
    CreateProductCategorySchema,
    UpdateProductCategorySchema
} from "./product-category.schema";

import { productCategoryController } from ".";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(CreateProductCategorySchema),
    asyncHandler((req, res) =>
        productCategoryController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res) =>
        productCategoryController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res) =>
        productCategoryController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(UpdateProductCategorySchema),
    asyncHandler((req, res) =>
        productCategoryController.update(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        productCategoryController.delete(req, res)
    )
);

export default router;