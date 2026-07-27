import { Request, Response } from "express";

import { QuotationService } from "./quotation.service";

import { successResponse } from "../../utils/response";

export class QuotationController {
    constructor(
        private readonly quotationService: QuotationService
    ) {}

    async create(req: Request, res: Response) {
        const quotation = await this.quotationService.create(req.body);

        return successResponse(
            res,
            quotation,
            "Quotation created successfully",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const quotations = await this.quotationService.findAll();

        return successResponse(
            res,
            quotations,
            "Quotations fetched successfully"
        );
    }

    async findById(req: Request, res: Response) {
        const quotation = await this.quotationService.findById(req.params.id as string);

        return successResponse(
            res,
            quotation,
            "Quotation fetched successfully"
        );
    }

    async delete(req: Request, res: Response) {
        await this.quotationService.delete(req.params.id as string);

        return successResponse(
            res,
            null,
            "Quotation deleted successfully"
        );
    }

    async createManualQuotation(
    req: Request,
    res: Response
) {
    const quotation =
        await this.quotationService
            .createManualQuotation(req.body);

    return successResponse(
        res,
        quotation,
        "Quotation created successfully."
    );
}

async downloadPdf(
    req: Request,
    res: Response
) {
    const pdf =
        await this.quotationService.generatePdf(
            req.params.id as string
        );

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `inline; filename=quotation-${req.params.id}.pdf`
    );

    pdf.pipe(res);

    pdf.end();
}

}