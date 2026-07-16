import { AppError } from "./app-error";

export class NotFoundException extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

