import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { successResponse } from "../../utils/response";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    async login(req: Request, res: Response) {
        const result = await this.authService.login(req.body);

        return successResponse(
            res,
            result,
            "Login successful."
        );
    }
}