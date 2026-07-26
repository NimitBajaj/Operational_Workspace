import { Request, Response } from "express";

import { CatalogueService } from "./catalogue.service";
import { successResponse } from "../../utils/response";

export class CatalogueController {
    constructor(
        private readonly catalogueService: CatalogueService
    ) {}

    async getCatalogue(req: Request, res: Response) {
        const catalogue =
            await this.catalogueService.getCatalogue();

        return successResponse(
            res,
            catalogue,
            "Catalogue retrieved successfully."
        );
    }

    async getProduct(req: Request, res: Response) {
    const product =
        await this.catalogueService.getProduct(
            req.params.slug as string
        );

    return successResponse(
        res,
        product,
        "Product retrieved successfully."
    );
}

}