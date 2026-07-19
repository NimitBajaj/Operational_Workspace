import { Router } from "express";

import { projectContactController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import { createProjectContactSchema } from "./project-contact.schema";

const router = Router({ mergeParams: true });

router.post(
    "/",
    validate(createProjectContactSchema.omit({ projectId: true })),
    asyncHandler((req, res) =>
        projectContactController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        projectContactController.findByProject(req, res)
    )
);

router.delete(
    "/:contactId",
    asyncHandler((req, res) =>
        projectContactController.delete(req, res)
    )
);

export default router;