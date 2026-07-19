import { Request, Response } from "express";

import { NoteService } from "./note.service";

import { successResponse } from "../../utils/response";

export class NoteController {
    constructor(
        private readonly noteService: NoteService
    ) {}

    async create(req: Request, res: Response) {
        const note = await this.noteService.create(req.body);

        return successResponse(
            res,
            note,
            "Note created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const notes = await this.noteService.findAll();

        return successResponse(
            res,
            notes,
            "Notes fetched successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const note = await this.noteService.findById(
            req.params.id as string
        );

        return successResponse(
            res,
            note,
            "Note fetched successfully."
        );
    }

    async findByProject(req: Request, res: Response) {
        const notes =
            await this.noteService.findByProject(
                req.params.projectId as string
            );

        return successResponse(
            res,
            notes,
            "Project notes fetched successfully."
        );
    }

    async findPinned(req: Request, res: Response) {
        const notes =
            await this.noteService.findPinned(
                req.params.projectId as string
            );

        return successResponse(
            res,
            notes,
            "Pinned notes fetched successfully."
        );
    }

    async update(req: Request, res: Response) {
        const note = await this.noteService.update(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            note,
            "Note updated successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.noteService.delete(
            req.params.id as string
        );

        return successResponse(
            res,
            null,
            "Note deleted successfully."
        );
    }
}