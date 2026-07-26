import { Router } from "express";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

import {
    CreateProposalRequestSchema,
    UpdateProposalRequestSchema,
} from "./proposal-request.schema";

import { proposalRequestController } from ".";

const router = Router();

/*
    PUBLIC
*/

router.post(
    "/",
    validate(CreateProposalRequestSchema),
    asyncHandler((req, res) =>
        proposalRequestController.create(req, res)
    )
);

/*
    ADMIN
*/

router.get(
    "/",
    asyncHandler((req, res) =>
        proposalRequestController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        proposalRequestController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(UpdateProposalRequestSchema),
    asyncHandler((req, res) =>
        proposalRequestController.update(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        proposalRequestController.delete(req, res)
    )
);

export default router;