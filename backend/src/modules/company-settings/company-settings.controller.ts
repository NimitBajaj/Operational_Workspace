import { Request, Response } from "express";

import { CompanySettingsService } from "./company-settings.service";

import { successResponse } from "../../utils/response";

export class CompanySettingsController {
    constructor(
        private readonly companySettingsService: CompanySettingsService
    ) {}

    async create(req: Request, res: Response) {
        const settings =
            await this.companySettingsService.create(req.body);

        return successResponse(
            res,
            settings,
            "Company settings created successfully."
        );
    }

    async find(req: Request, res: Response) {
        const settings =
            await this.companySettingsService.find();

        return successResponse(
            res,
            settings,
            "Company settings fetched successfully."
        );
    }

    async update(req: Request, res: Response) {
        const settings =
            await this.companySettingsService.update(req.body);

        return successResponse(
            res,
            settings,
            "Company settings updated successfully."
        );
    }
}