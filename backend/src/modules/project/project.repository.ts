import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProjectRepository{
    constructor(private readonly prisma: PrismaExecutor){}

    async create(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({
        data,
        include: {
            customer: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.project.findUnique({
        where: { id },
        include: {
            customer: true,
        },
    });
}

async findAll() {
    return this.prisma.project.findMany({
        include: {
            customer: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async update(id: string, data: Prisma.ProjectUpdateInput) {
    return this.prisma.project.update({
        where: { id },
        data,
        include: {
            customer: true,
        },
    });
}

async delete(id: string) {
    return this.prisma.project.delete({
        where: { id },
    });
}

}