import { Router } from "express";

import { paymentController } from "./index";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import {
    createPaymentSchema,
    updatePaymentSchema,
    markPaymentPaidSchema,
    followUpSchema,
} from "./payment.schema";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createPaymentSchema),
    asyncHandler((req, res) =>
        paymentController.create(req, res)
    )
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        paymentController.findAll(req, res)
    )
);

router.get(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        paymentController.findById(req, res)
    )
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate(updatePaymentSchema),
    asyncHandler((req, res) =>
        paymentController.update(req, res)
    )
);

router.patch(
    "/:id/pay",
    authenticate,
    authorize("ADMIN"),
    validate(markPaymentPaidSchema),
    asyncHandler((req, res) =>
        paymentController.markAsPaid(req, res)
    )
);

router.patch(
    "/:id/follow-up",
    authenticate,
    authorize("ADMIN"),
    validate(followUpSchema),
    asyncHandler((req, res) =>
        paymentController.scheduleFollowUp(req, res)
    )
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    asyncHandler((req, res) =>
        paymentController.delete(req, res)
    )
);

export default router;