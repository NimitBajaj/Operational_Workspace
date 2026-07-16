import { AppError } from "./app-error";

export class ConflictException extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}
