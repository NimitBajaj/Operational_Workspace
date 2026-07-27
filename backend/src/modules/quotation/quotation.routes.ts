import { Router } from "express";

import { quotationController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import {
    createQuotationSchema
} from "./quotation.schema";
import { createManualQuotationSchema } from "./create-manual-quotation.schema";

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

router.post(
    "/manual",

    validate(
        createManualQuotationSchema
    ),

    asyncHandler((req, res) =>
        quotationController.createManualQuotation(
            req,
            res
        )
    )
);

export default router;