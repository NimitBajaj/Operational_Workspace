import { prisma } from "../../lib/prisma";

import { ActivityRepository } from "./activity.repository";
import { ActivityService } from "./activity.service";
import { ActivityController } from "./activity.controller";

import { ProjectRepository } from "../project/project.repository";

const activityRepository = new ActivityRepository(prisma);
const projectRepository = new ProjectRepository(prisma);

const activityService = new ActivityService(
    activityRepository,
    projectRepository
);

export const activityController =
    new ActivityController(activityService);