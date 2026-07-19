import { Router } from "express";

import { activityController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import { createActivitySchema } from "./activity.schema";

const router = Router();

router.post(
    "/",
    validate(createActivitySchema),
    asyncHandler((req, res) =>
        activityController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        activityController.findAll(req, res)
    )
);

router.get(
    "/project/:projectId",
    asyncHandler((req, res) =>
        activityController.findByProject(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        activityController.findById(req, res)
    )
);

export default router;