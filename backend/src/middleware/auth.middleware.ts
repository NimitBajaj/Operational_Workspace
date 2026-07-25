import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedException } from "../common/errors/unauthorized-error";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const header = req.headers.authorization;

    if (!header) {
        throw new UnauthorizedException(
            "Authentication token missing."
        );
    }

    const token = header.replace("Bearer ", "");

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as JwtPayload;

        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role as any,
        };

        next();
    } catch {
        throw new UnauthorizedException(
            "Invalid or expired token."
        );
    }
}