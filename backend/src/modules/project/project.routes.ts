import { Router } from "express";

import { projectController } from "./index";
import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import {
    createProjectSchema,
    updateProjectSchema,
} from "./project.schema";

const router = Router();

router.post(
    "/",
    validate(createProjectSchema),
    asyncHandler((req, res) => projectController.create(req, res))
);

router.get(
    "/",
    asyncHandler((req, res) => projectController.findAll(req, res))
);

router.get(
    "/:id",
    asyncHandler((req, res) => projectController.findById(req, res))
);

router.patch(
    "/:id",
    validate(updateProjectSchema),
    asyncHandler((req, res) => projectController.update(req, res))
);

router.delete(
    "/:id",
    asyncHandler((req, res) => projectController.delete(req, res))
);

export default router;