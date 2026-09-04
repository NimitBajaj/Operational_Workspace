import { Request, Response } from "express";

import { DashboardService } from "./dashboard.service";

export class DashboardController {
    constructor(
        private readonly service: DashboardService
    ) {}

    getDashboard = async (
        req: Request,
        res: Response
    ) => {
        const data =
            await this.service.getDashboard();

        return res.json({
            success: true,
            data,
        });
    };
}