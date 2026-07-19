import { prisma } from "../../lib/prisma";

import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

import { ProjectRepository } from "../project/project.repository";

const taskRepository = new TaskRepository(prisma);
const projectRepository = new ProjectRepository(prisma);

const taskService = new TaskService(
    taskRepository,
    projectRepository
);

export const taskController = new TaskController(
    taskService
);