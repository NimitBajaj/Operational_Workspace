import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/errors/app-error";
import { errorResponse } from "../utils/response";

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) { 

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error(err);

    return errorResponse(res, 
        err.message,
        500
    );
}