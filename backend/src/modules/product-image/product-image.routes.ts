import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";
import { asyncHandler } from "../../utils/async-handler";

import {
    CreateProductImageSchema,
    UpdateProductImageSchema,
} from "./product-image.schema";

import { productImageController } from ".";
import { createUploader } from "../../middleware/upload.middleware";
import { UploadType } from "../../upload/upload.types";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();
const imageUpload = createUploader(UploadType.IMAGE);

/**
 * Create a new image for a product
 */
router.post(
    "/products/:productId/images",
    authenticate,
    authorize("ADMIN"),
    imageUpload.single("image"),

    validate(CreateProductImageSchema),

    asyncHandler((req, res) =>
        productImageController.create(req, res)
    )
);

/**
 * Get all images of a product
 */
router.get(
    "/products/:productId/images",
    authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res) =>
        productImageController.findByProduct(req, res)
    )
);

/**
 * Get a single image
 */
router.get(
    "/product-images/:id",
    authenticate,
    authorize("ADMIN", "CUSTOMER"),
    asyncHandler((req, res) =>
        productImageController.findById(req, res)
    )
);

/**
 * Update image metadata
 */
router.patch(
    "/product-images/:id",
    authenticate,
    authorize("ADMIN"),
    validate(UpdateProductImageSchema),
    asyncHandler((req, res) =>
        productImageController.update(req, res)
    )
);

/**
 * Delete an image
 */
router.delete(
    "/product-images/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        productImageController.delete(req, res)
    )
);

export default router;