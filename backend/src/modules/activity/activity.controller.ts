import { Request, Response } from "express";

import { ActivityService } from "./activity.service";

import { successResponse } from "../../utils/response";

export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) {}

    async create(req: Request, res: Response) {
        const activity = await this.activityService.create(req.body);

        return successResponse(
            res,
            activity,
            "Activity created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const activities =
            await this.activityService.findAll();

        return successResponse(
            res,
            activities,
            "Activities fetched successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const activity =
            await this.activityService.findById(req.params.id as string);

        return successResponse(
            res,
            activity,
            "Activity fetched successfully."
        );
    }

    async findByProject(req: Request, res: Response) {
        const activities =
            await this.activityService.findByProject(
                req.params.projectId as string
            );

        return successResponse(
            res,
            activities,
            "Project activities fetched successfully."
        );
    }
}