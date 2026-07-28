import { Router } from "express";

import { prisma } from "../../lib/prisma";

import { DashboardRepository } from "./dashboard.repository";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";

const router = Router();

const repository =
    new DashboardRepository(prisma);

const service =
    new DashboardService(repository);

const controller =
    new DashboardController(service);

router.get(
    "/",
    controller.getDashboard
);

export default router;