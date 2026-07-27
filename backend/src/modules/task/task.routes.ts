import { Router } from "express";

import { taskController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

import {
    createTaskSchema,
    updateTaskSchema,
} from "./task.schema";

const router = Router();

router.post(
    "/",
    validate(createTaskSchema),
    asyncHandler((req, res) =>
        taskController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        taskController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        taskController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(updateTaskSchema),
    asyncHandler((req, res) =>
        taskController.update(req, res)
    )
);

router.patch(
    "/:id/start",
    asyncHandler((req, res) =>
        taskController.start(req, res)
    )
);

router.patch(
    "/:id/complete",
    asyncHandler((req, res) =>
        taskController.complete(req, res)
    )
);

router.patch(
    "/:id/block",
    asyncHandler((req, res) =>
        taskController.block(req, res)
    )
);

router.patch(
    "/:id/delay",
    asyncHandler((req, res) =>
        taskController.delay(req, res)
    )
);

router.patch(
    "/:id/resolve",
    asyncHandler((req, res) =>
        taskController.resolve(req, res)
    )
);

router.patch(
    "/:id/reopen",
    asyncHandler((req, res) =>
        taskController.reopen(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        taskController.delete(req, res)
    )
);

export default router;