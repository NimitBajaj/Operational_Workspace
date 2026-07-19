import { Request, Response } from "express";

import { ProjectContactService } from "./project-contact.service";
import { successResponse } from "../../utils/response";

export class ProjectContactController {
    constructor(
        private readonly projectContactService: ProjectContactService
    ) {}

    async create(req: Request, res: Response) {
        const projectContact =
            await this.projectContactService.create({
                projectId: req.params.projectId as string,
                contactId: req.body.contactId,
            });

        return successResponse(
            res,
            projectContact,
            "Contact linked to project successfully.",
            201
        );
    }

    async findByProject(req: Request, res: Response) {
        const contacts =
            await this.projectContactService.findByProject(
                req.params.projectId as string
            );

        return successResponse(
            res,
            contacts,
            "Project contacts fetched successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.projectContactService.delete(
            req.params.projectId as string,
            req.params.contactId as string
        );

        return successResponse(
            res,
            null,
            "Contact removed from project successfully."
        );
    }
}