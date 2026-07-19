import { Router } from "express";

import { documentController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createDocumentSchema,
    updateDocumentSchema,
} from "./document.schema";

const router = Router();

router.post(
    "/",
    validate(createDocumentSchema),
    asyncHandler((req, res) =>
        documentController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        documentController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        documentController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(updateDocumentSchema),
    asyncHandler((req, res) =>
        documentController.update(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        documentController.delete(req, res)
    )
);

export default router;