import { Request, Response, NextFunction } from "express";
import { ProjectService } from "./project.service";
import { successResponse } from "../../utils/response";

export class ProjectContoller{
    constructor(
        private readonly projectService: ProjectService
    ) {}

async create(req: Request, res: Response) {
    const project = await this.projectService.create(req.body);

    return successResponse(
        res,
        project,
        "Project created successfully",
        201
    );
}

async findAll(req: Request, res: Response) {
    const projects = await this.projectService.findAll();

    return successResponse(
        res,
        projects,
        "Projects fetched successfully"
    );
}

async findById(req: Request, res: Response) {
    const project = await this.projectService.findById(req.params.id as string);

    return successResponse(
        res,
        project,
        "Project fetched successfully"
    );
}

async update(req: Request, res: Response) {
    const project = await this.projectService.update(
        req.params.id as string,
        req.body
    );

    return successResponse(
        res,
        project,
        "Project updated successfully"
    );
}

async delete(req: Request, res: Response) {
    await this.projectService.delete(req.params.id as string);

    return successResponse(
        res,
        null,
        "Project deleted successfully"
    );
}

}