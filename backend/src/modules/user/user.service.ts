import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

import { UserRepository } from "./user.repository";

import {
    CreateUserInput,
    UpdateUserInput,
} from "./user.schema";

import { ConflictException } from "../../common/errors/conflict-error";
import { NotFoundException } from "../../common/errors/not-found-error";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async create(data: CreateUserInput) {
        const existingUser =
            await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictException(
                `User with email "${data.email}" already exists.`
            );
        }
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

        const hashedPassword = await bcrypt.hash(
            data.password,
            saltRounds
        );

        return this.userRepository.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            role: data.role ?? UserRole.CUSTOMER,
            active: data.active ?? true,
        });
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async findById(id: string) {
        const user =
            await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException(
                `User with id "${id}" not found.`
            );
        }

        return user;
    }

    async findByEmail(email: string) {
        const user =
            await this.userRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundException(
                `User with email "${email}" not found.`
            );
        }

        return user;
    }

    async update(
        id: string,
        data: UpdateUserInput
    ) {
        const user = await this.findById(id);

        if (
            data.email &&
            data.email !== user.email
        ) {
            const existing =
                await this.userRepository.findByEmail(
                    data.email
                );

            if (existing) {
                throw new ConflictException(
                    `User with email "${data.email}" already exists.`
                );
            }
        }

        return this.userRepository.update(id, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            role: data.role,
            active: data.active,
        });
    }

    async delete(id: string) {
        await this.findById(id);

        return this.userRepository.delete(id);
    }
}