import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class NoteRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.NoteCreateInput) {
    return this.prisma.note.create({
        data,
        include: {
            project: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.note.findUnique({
        where: {
            id,
        },
        include: {
            project: true,
        },
    });
}

async findAll() {
    return this.prisma.note.findMany({
        include: {
            project: true,
        },
        orderBy: [
            {
                isPinned: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
    });
}

async findByProject(projectId: string) {
    return this.prisma.note.findMany({
        where: {
            projectId,
        },
        include: {
            project: true,
        },
        orderBy: [
            {
                isPinned: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
    });
}

async findPinned(projectId: string) {
    return this.prisma.note.findMany({
        where: {
            projectId,
            isPinned: true,
        },
        include: {
            project: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async update(
    id: string,
    data: Prisma.NoteUpdateInput
) {
    return this.prisma.note.update({
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
    return this.prisma.note.delete({
        where: {
            id,
        },
    });
}


}