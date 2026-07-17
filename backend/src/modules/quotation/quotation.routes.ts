import { Router } from "express";

import { quotationController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createQuotationSchema
} from "./quotation.schema";

const router = Router();

router.post(
    "/",
    validate(createQuotationSchema),
    asyncHandler((req, res) =>
        quotationController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        quotationController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        quotationController.findById(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        quotationController.delete(req, res)
    )
);

export default router;