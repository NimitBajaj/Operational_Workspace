import { Router } from "express";

import { noteController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createNoteSchema,
    updateNoteSchema,
} from "./note.schema";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createNoteSchema),
    asyncHandler((req, res) =>
        noteController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        noteController.findAll(req, res)
    )
);

router.get(
    "/project/:projectId",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        noteController.findByProject(req, res)
    )
);

router.get(
    "/project/:projectId/pinned",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        noteController.findPinned(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        noteController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updateNoteSchema),
    asyncHandler((req, res) =>
        noteController.update(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        noteController.delete(req, res)
    )
);

export default router;