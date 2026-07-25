import { Router } from "express";

import { productVariantController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

import {
    createProductVariantSchema,
    updateProductVariantSchema,
} from "./product-variant.schema";

const router = Router();

router.post(
    "/",
    authenticate,
        authorize("ADMIN"),
    validate(createProductVariantSchema),
    asyncHandler((req, res) =>
        productVariantController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
        authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res) =>
        productVariantController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
        authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res) =>
        productVariantController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    validate(updateProductVariantSchema),
    asyncHandler((req, res) =>
        productVariantController.update(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        productVariantController.delete(req, res)
    )
);

export default router;