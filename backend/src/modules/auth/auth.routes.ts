import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";
import { asyncHandler } from "../../utils/async-handler";

import { LoginSchema } from "./auth.schema";

import { authController } from ".";

const router = Router();

router.post(
    "/login",
    validate(LoginSchema),
    asyncHandler((req, res) =>
        authController.login(req, res)
    )
);

export default router;