import { Request, Response } from "express";

import { TaskService } from "./task.service";

import { successResponse } from "../../utils/response";

export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}

    async create(req: Request, res: Response) {
        const task = await this.taskService.create(req.body);

        return successResponse(
            res,
            task,
            "Task created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const tasks = await this.taskService.findAll();

        return successResponse(
            res,
            tasks,
            "Tasks fetched successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const task = await this.taskService.findById(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task fetched successfully."
        );
    }

    async update(req: Request, res: Response) {
        const task = await this.taskService.update(
            req. params.id as string,
            req.body
        );

        return successResponse(
            res,
            task,
            "Task updated successfully."
        );
    }

    async start(req: Request, res: Response) {
        const task = await this.taskService.start(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task started successfully."
        );
    }

    async complete(req: Request, res: Response) {
        const task = await this.taskService.complete(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task completed successfully."
        );
    }

    async block(req: Request, res: Response) {
        const task = await this.taskService.block(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task blocked successfully."
        );
    }

    async delay(req: Request, res: Response) {
        const task = await this.taskService.delay(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task delayed successfully."
        );
    }

    async resolve(req: Request, res: Response) {
        const task = await this.taskService.resolve(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task resolved successfully."
        );
    }

    async reopen(req: Request, res: Response) {
        const task = await this.taskService.reopen(req. params.id as string);

        return successResponse(
            res,
            task,
            "Task reopened successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.taskService.delete(req. params.id as string);

        return successResponse(
            res,
            null,
            "Task deleted successfully."
        );
    }
}