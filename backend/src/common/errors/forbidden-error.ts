import { AppError } from "./app-error";

export class ForbiddenException extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}