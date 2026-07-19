import { Request, Response } from "express";

import { DocumentService } from "./document.service";

import { successResponse } from "../../utils/response";

export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ) {}

    async create(req: Request, res: Response) {
        const document = await this.documentService.create(req.body);

        return successResponse(
            res,
            document,
            "Document created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const documents = await this.documentService.findAll();

        return successResponse(
            res,
            documents,
            "Documents fetched successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const document = await this.documentService.findById(
            req.params.id as string
        );

        return successResponse(
            res,
            document,
            "Document fetched successfully."
        );
    }

    async update(req: Request, res: Response) {
        const document = await this.documentService.update(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            document,
            "Document updated successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.documentService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Document deleted successfully."
        );
    }
}

