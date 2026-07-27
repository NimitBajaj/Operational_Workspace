import { Router } from "express";

import { prisma } from "../../lib/prisma";

import { asyncHandler } from "../../utils/async-handler";
import { validate } from "../../middleware/validation.middleware";

import { CompanySettingsRepository } from "./company-settings.repository";
import { CompanySettingsService } from "./company-settings.service";
import { CompanySettingsController } from "./company-settings.controller";

import {
    createCompanySettingsSchema,
    updateCompanySettingsSchema,
} from "./company-settings.schema";

const repository =
    new CompanySettingsRepository(prisma);

const service =
    new CompanySettingsService(repository);

const controller =
    new CompanySettingsController(service);

const router = Router();

router.post(
    "/",
    validate(createCompanySettingsSchema),
    asyncHandler((req, res) =>
        controller.create(req, res)
    )
);

router.get(
    "/",
    asyncHandler((req, res) =>
        controller.find(req, res)
    )
);

router.patch(
    "/",
    validate(updateCompanySettingsSchema),
    asyncHandler((req, res) =>
        controller.update(req, res)
    )
);

export default router;