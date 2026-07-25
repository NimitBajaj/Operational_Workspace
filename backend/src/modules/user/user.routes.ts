import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import {
    CreateUserSchema,
    UpdateUserSchema,
} from "./user.schema";

import { userController } from ".";

const router = Router();

router.post(
    "/",
    validate(CreateUserSchema),
    asyncHandler((req, res) =>
        userController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        userController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        userController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    validate(UpdateUserSchema),
    asyncHandler((req, res) =>
        userController.update(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        userController.delete(req, res)
    )
);

export default router;