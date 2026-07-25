import { prisma } from "../../lib/prisma";

import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const userRepository = new UserRepository(prisma);

const userService = new UserService(userRepository);

export const userController = new UserController(userService);