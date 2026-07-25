import { Router } from "express";

import { quotationController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import {
    createQuotationSchema
} from "./quotation.schema";

const router = Router();

router.post(
    "/",
    authenticate,
        authorize("ADMIN"),
    validate(createQuotationSchema),
    asyncHandler((req, res) =>
        quotationController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        quotationController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        quotationController.findById(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
        authorize("ADMIN"),
    asyncHandler((req, res) =>
        quotationController.delete(req, res)
    )
);

export default router;