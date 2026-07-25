import { Router } from "express";

import { documentController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createDocumentSchema,
    updateDocumentSchema,
} from "./document.schema";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createDocumentSchema),
    asyncHandler((req, res) =>
        documentController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        documentController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        documentController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateDocumentSchema),
    asyncHandler((req, res) =>
        documentController.update(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        documentController.delete(req, res)
    )
);

export default router;