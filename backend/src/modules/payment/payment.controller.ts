import { Request, Response } from "express";

import { PaymentService } from "./payment.service";

import { successResponse } from "../../utils/response";

export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) {}

    async create(req: Request, res: Response) {
        const payment = await this.paymentService.create(req.body);

        return successResponse(
            res,
            payment,
            "Payment created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const payments = await this.paymentService.findAll();

        return successResponse(
            res,
            payments,
            "Payments fetched successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const payment = await this.paymentService.findById(req.params.id as string);

        return successResponse(
            res,
            payment,
            "Payment fetched successfully."
        );
    }

    async update(req: Request, res: Response) {
        const payment = await this.paymentService.update(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            payment,
            "Payment updated successfully."
        );
    }

    async markAsPaid(req: Request, res: Response) {
        const payment = await this.paymentService.markAsPaid(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            payment,
            "Payment marked as paid."
        );
    }

    async scheduleFollowUp(req: Request, res: Response) {
        const payment = await this.paymentService.scheduleFollowUp(
            req.params.id as string,
            req.body
        );

        return successResponse(
            res,
            payment,
            "Follow-up scheduled successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.paymentService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Payment deleted successfully."
        );
    }
}

