import { Router } from "express";

import { projectContactController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { createProjectContactSchema } from "./project-contact.schema";

const router = Router({ mergeParams: true });

router.post(
    "/",
    authenticate,
        authorize("ADMIN"),
    validate(createProjectContactSchema.omit({ projectId: true })),
    asyncHandler((req, res) =>
        projectContactController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        projectContactController.findByProject(req, res)
    )
);

router.delete(
    "/:contactId",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        projectContactController.delete(req, res)
    )
);

export default router;