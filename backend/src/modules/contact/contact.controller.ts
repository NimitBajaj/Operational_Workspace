import { Request, Response } from "express";
import { ContactService } from "./contact.service";
import { successResponse } from "../../utils/response";

export class ContactController {
    constructor(
        private readonly contactService: ContactService
    ) {}

    async create(req: Request, res: Response) {
        const contact = await this.contactService.create(req.body);

        return successResponse(
            res,
            contact,
            "Contact created successfully",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const contacts = await this.contactService.findAll();

        return successResponse(
            res,
            contacts,
            "Contacts fetched successfully"
        );
    }

    async findById(req: Request, res: Response) {
        const contact = await this.contactService.findById(req.params.id as string);

        return successResponse(
            res,
            contact,
            "Contact fetched successfully"
        );
    }

    async update(req: Request, res: Response) {
        const contact = await this.contactService.update(
            req.params.id as string ,
            req.body
        );

        return successResponse(
            res,
            contact,
            "Contact updated successfully"
        );
    }

    async delete(req: Request, res: Response) {
        await this.contactService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Contact deleted successfully"
        );
    }
}

