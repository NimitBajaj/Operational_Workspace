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
    validate(createNoteSchema),
    asyncHandler((req, res) =>
        noteController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        noteController.findAll(req, res)
    )
);

router.get(
    "/project/:projectId",
    asyncHandler((req, res) =>
        noteController.findByProject(req, res)
    )
);

router.get(
    "/project/:projectId/pinned",
    asyncHandler((req, res) =>
        noteController.findPinned(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        noteController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(updateNoteSchema),
    asyncHandler((req, res) =>
        noteController.update(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        noteController.delete(req, res)
    )
);

export default router;