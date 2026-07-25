import { Router } from "express";

import { contactController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createContactSchema,
    updateContactSchema,
} from "./contact.schema";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createContactSchema),
    asyncHandler((req, res) =>
        contactController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        contactController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        contactController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateContactSchema),
    asyncHandler((req, res) =>
        contactController.update(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        contactController.delete(req, res)
    )
);

export default router;