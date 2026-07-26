import { Request, Response } from "express";

import { ProposalRequestService } from "./proposal-request.service";
import { successResponse } from "../../utils/response";

export class ProposalRequestController {
    constructor(
        private readonly proposalRequestService: ProposalRequestService
    ) {}

    async create(req: Request, res: Response) {
        const proposal =
            await this.proposalRequestService.create(req.body);

        return successResponse(
            res,
            proposal,
            "Proposal request created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const proposals =
            await this.proposalRequestService.findAll();

        return successResponse(
            res,
            proposals,
            "Proposal requests retrieved successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const proposal =
            await this.proposalRequestService.findById(
                req.params.id as string
            );

        return successResponse(
            res,
            proposal,
            "Proposal request retrieved successfully."
        );
    }

    async update(req: Request, res: Response) {
        const proposal =
            await this.proposalRequestService.update(
                req.params.id as string,
                req.body
            );

        return successResponse(
            res,
            proposal,
            "Proposal request updated successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.proposalRequestService.delete(
            req.params.id as string
        );

        return successResponse(
            res,
            null,
            "Proposal request deleted successfully."
        );
    }
}