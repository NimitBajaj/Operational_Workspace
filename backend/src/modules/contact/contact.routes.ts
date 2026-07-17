import { Router } from "express";

import { contactController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createContactSchema,
    updateContactSchema,
} from "./contact.schema";

const router = Router();

router.post(
    "/",
    validate(createContactSchema),
    asyncHandler((req, res) =>
        contactController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        contactController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        contactController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(updateContactSchema),
    asyncHandler((req, res) =>
        contactController.update(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        contactController.delete(req, res)
    )
);

export default router;