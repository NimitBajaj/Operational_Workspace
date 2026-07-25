import { Request, Response } from "express";

import { UserService } from "./user.service";
import { successResponse } from "../../utils/response";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    async create(req: Request, res: Response) {
        const user = await this.userService.create(req.body);

        return successResponse(
            res,
            user,
            "User created successfully.",
            201
        );
    }

    async findAll(req: Request, res: Response) {
        const users = await this.userService.findAll();

        return successResponse(
            res,
            users,
            "Users retrieved successfully."
        );
    }

    async findById(req: Request, res: Response) {
        const user = await this.userService.findById(
            req. params.id as string
        );

        return successResponse(
            res,
            user,
            "User retrieved successfully."
        );
    }

    async update(req: Request, res: Response) {
        const user = await this.userService.update(
            req. params.id as string,
            req.body
        );

        return successResponse(
            res,
            user,
            "User updated successfully."
        );
    }

    async delete(req: Request, res: Response) {
        await this.userService.delete(req. params.id as string);

        return successResponse(
            res,
            null,
            "User deleted successfully."
        );
    }
}