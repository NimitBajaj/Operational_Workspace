import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

import { ForbiddenException } from "../common/errors/forbidden-error";

export function authorize(...roles: UserRole[]) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            throw new ForbiddenException(
                "Authentication required."
            );
        }

        if (!roles.includes(req.user.role)) {
            throw new ForbiddenException(
                "You are not authorized to perform this action."
            );
        }

        next();
    };
}