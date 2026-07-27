import { prisma } from "../../lib/prisma";

import { UserRepository } from "../user/user.repository";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

const userRepository = new UserRepository(prisma);

const authService = new AuthService(
    userRepository
);

export const authController =
    new AuthController(authService);