import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProjectContactRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

async create(data: Prisma.ProjectContactCreateInput) {
    return this.prisma.projectContact.create({
        data,
        include: {
            project: true,
            contact: true,
        },
    });
}

async find(projectId: string, contactId: string) {
    return this.prisma.projectContact.findUnique({
        where: {
            projectId_contactId: {
                projectId,
                contactId,
            },
        },
        include: {
            project: true,
            contact: true,
        },
    });
}

async findByProject(projectId: string) {
    return this.prisma.projectContact.findMany({
        where: {
            projectId,
        },
        include: {
            contact: true,
        },
    });
}

async findByContact(contactId: string) {
    return this.prisma.projectContact.findMany({
        where: {
            contactId,
        },
        include: {
            project: true,
        },
    });
}

async delete(
    projectId: string,
    contactId: string
) {
    return this.prisma.projectContact.delete({
        where: {
            projectId_contactId: {
                projectId,
                contactId,
            },
        },
    });
}


}