import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor =
    PrismaClient | Prisma.TransactionClient;

export class ActivityRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.ActivityCreateInput) {
    return this.prisma.activity.create({
        data,
        include: {
            project: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.activity.findUnique({
        where: { id },
        include: {
            project: true,
        },
    });
}

async findAll() {
    return this.prisma.activity.findMany({
        include: {
            project: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByProject(projectId: string) {
    return this.prisma.activity.findMany({
        where: {
            projectId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

}