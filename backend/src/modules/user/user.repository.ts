import { Prisma, PrismaClient, User } from "@prisma/client";

export const userSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    role: true,
    active: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.UserSelect;

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class UserRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
            select: userSelect,
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: userSelect,
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            select: userSelect,
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: userSelect,
        });
    }

    async delete(id: string) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}