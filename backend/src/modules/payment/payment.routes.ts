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
    validate(createPaymentSchema),
    asyncHandler((req, res) =>
        paymentController.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        paymentController.findAll(req, res)
    )
);

router.get(
    "/:id",
    asyncHandler((req, res) =>
        paymentController.findById(req, res)
    )
);

router.patch(
    "/:id",
    validate(updatePaymentSchema),
    asyncHandler((req, res) =>
        paymentController.update(req, res)
    )
);

router.patch(
    "/:id/pay",
    validate(markPaymentPaidSchema),
    asyncHandler((req, res) =>
        paymentController.markAsPaid(req, res)
    )
);

router.patch(
    "/:id/follow-up",
    validate(followUpSchema),
    asyncHandler((req, res) =>
        paymentController.scheduleFollowUp(req, res)
    )
);

router.delete(
    "/:id",
    asyncHandler((req, res) =>
        paymentController.delete(req, res)
    )
);

export default router;