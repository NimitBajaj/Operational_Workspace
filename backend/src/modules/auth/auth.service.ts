import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../user/user.repository";

import { LoginInput } from "./auth.schema";

import { UnauthorizedException } from "../../common/errors/unauthorized-error";

export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async login(data: LoginInput) {
        const user =
            await this.userRepository.findByEmailWithPassword(
                data.email
            );

        if (!user) {
            throw new UnauthorizedException(
                "Invalid email or password."
            );
        }

        const passwordMatches =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!passwordMatches) {
            throw new UnauthorizedException(
                "Invalid email or password."
            );
        }

        if (!user.active) {
            throw new UnauthorizedException(
                "Your account has been deactivated."
            );
        }

        const secret = process.env.JWT_ACCESS_SECRET;

if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not configured.");
}

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email,
            },
            secret,
            {
                expiresIn: "1h",
            }
        );

        return {
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                active: user.active,
            },
        };
    }
}