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
    validate(createProductVariantSchema),
    asyncHandler((req, res) =>
        productVariantController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        productVariantController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        productVariantController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(updateProductVariantSchema),
    asyncHandler((req, res) =>
        productVariantController.update(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        productVariantController.delete(req, res)
    )
);

export default router;