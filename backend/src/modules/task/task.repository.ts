import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class TaskRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
        data,
        include: {
            project: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.task.findUnique({
        where: {
            id,
        },
        include: {
            project: true,
        },
    });
}

async findAll() {
    return this.prisma.task.findMany({
        include: {
            project: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByProject(projectId: string) {
    return this.prisma.task.findMany({
        where: {
            projectId,
        },
        include: {
            project: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findPending() {
    return this.prisma.task.findMany({
        where: {
            status: "PENDING",
        },
        include: {
            project: true,
        },
        orderBy: {
            dueDate: "asc",
        },
    });
}

async findOverdue() {
    return this.prisma.task.findMany({
        where: {
            dueDate: {
                lt: new Date(),
            },
            status: {
                not: "COMPLETED",
            },
        },
        include: {
            project: true,
        },
        orderBy: {
            dueDate: "asc",
        },
    });
}

async update(
    id: string,
    data: Prisma.TaskUpdateInput
) {
    return this.prisma.task.update({
        where: {
            id,
        },
        data,
        include: {
            project: true,
        },
    });
}

async delete(id: string) {
    return this.prisma.task.delete({
        where: {
            id,
        },
    });
}

}