import { Router } from "express";

import { activityController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import { createActivitySchema } from "./activity.schema";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createActivitySchema),
    asyncHandler((req, res) =>
        activityController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        activityController.findAll(req, res)
    )
);

router.get(
    "/project/:projectId",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        activityController.findByProject(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        activityController.findById(req, res)
    )
);

export default router;