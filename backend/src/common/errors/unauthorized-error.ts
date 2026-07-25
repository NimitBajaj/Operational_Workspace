import { AppError } from "./app-error";

export class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}