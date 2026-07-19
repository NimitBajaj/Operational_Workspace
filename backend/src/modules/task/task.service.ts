import {
    Prisma,
    TaskStatus,
} from "@prisma/client";

import { TaskRepository } from "./task.repository";
import { ProjectRepository } from "../project/project.repository";

import {
    CreateTaskInput,
    UpdateTaskInput,
} from "./task.schema";

import { NotFoundException } from "../../common/errors/not-found-error";
import { ConflictException } from "../../common/errors/conflict-error";

export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly projectRepository: ProjectRepository
    ) {}

   async create(data: CreateTaskInput) {

    const project =
        await this.projectRepository.findById(
            data.projectId
        );

    if (!project) {
        throw new NotFoundException(
            `Project with id "${data.projectId}" not found.`
        );
    }

    return this.taskRepository.create({

        title: data.title,

        description: data.description,

        type: data.type,

        priority: data.priority,

        dueDate: data.dueDate
            ? new Date(data.dueDate)
            : undefined,

        status: TaskStatus.PENDING,

        isReminderSent: false,

        project: {
            connect: {
                id: data.projectId,
            },
        },
    });
}

async findAll() {
    return this.taskRepository.findAll();
}

async findById(id: string) {

    const task =
        await this.taskRepository.findById(id);

    if (!task) {
        throw new NotFoundException(
            `Task with id "${id}" not found.`
        );
    }

    return task;
}

async update(
    id: string,
    data: UpdateTaskInput
) {

    await this.findById(id);

    return this.taskRepository.update(id, {

        title: data.title,

        description: data.description,

        type: data.type,

        priority: data.priority,

        dueDate: data.dueDate
            ? new Date(data.dueDate)
            : undefined,
    });
}

async start(id: string) {

    const task =
        await this.findById(id);

    if (task.status === TaskStatus.COMPLETED) {
        throw new ConflictException(
            "Completed task cannot be started."
        );
    }

    if (task.status === TaskStatus.IN_PROGRESS) {
    throw new ConflictException(
        "Task is already in progress."
    );
}

    return this.taskRepository.update(id, {
        status: TaskStatus.IN_PROGRESS,
    });
}

async complete(id: string) {

    const task =
        await this.findById(id);

    if (task.status === TaskStatus.COMPLETED) {
        throw new ConflictException(
            "Task is already completed."
        );
    }

    return this.taskRepository.update(id, {

        status: TaskStatus.COMPLETED,

        completedAt: new Date(),
    });
}

async block(id: string) {

    const task = await this.findById(id);

    if (task.status === TaskStatus.COMPLETED) {
    throw new ConflictException(
        "Completed task cannot change status."
    );
}

    return this.taskRepository.update(id, {
        status: TaskStatus.BLOCKED,
    });
}

async delay(id: string) {

    const task = await this.findById(id);

    if (task.status === TaskStatus.COMPLETED) {
    throw new ConflictException(
        "Completed task cannot change status."
    );
}

    return this.taskRepository.update(id, {
        status: TaskStatus.DELAYED,
    });
}

async resolve(id: string) {

    const task = await this.findById(id);

    if (task.status === TaskStatus.COMPLETED) {
    throw new ConflictException(
        "Completed task cannot change status."
    );
}

    return this.taskRepository.update(id, {
        status: TaskStatus.RESOLVED,
    });
}

async reopen(id: string) {

    const task =
        await this.findById(id);

    if (task.status !== TaskStatus.COMPLETED) {
        throw new ConflictException(
            "Only completed tasks can be reopened."
        );
    }

    return this.taskRepository.update(id, {

        status: TaskStatus.PENDING,

        completedAt: null,
    });
}

async delete(id: string) {

    await this.findById(id);

    return this.taskRepository.delete(id);
}
}
