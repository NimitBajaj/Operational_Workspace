import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class DocumentRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.DocumentCreateInput) {
    return this.prisma.document.create({
        data,
        include: {
            product: true,
            project: true,
            quotation: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.document.findUnique({
        where: {
            id,
        },
        include: {
            product: true,
            project: true,
            quotation: true,
        },
    });
}

async findAll() {
    return this.prisma.document.findMany({
        include: {
            product: true,
            project: true,
            quotation: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByProject(projectId: string) {
    return this.prisma.document.findMany({
        where: {
            projectId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByProduct(productId: string) {
    return this.prisma.document.findMany({
        where: {
            productId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByQuotation(quotationId: string) {
    return this.prisma.document.findMany({
        where: {
            quotationId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async update(
    id: string,
    data: Prisma.DocumentUpdateInput
) {
    return this.prisma.document.update({
        where: {
            id,
        },
        data,
        include: {
            product: true,
            project: true,
            quotation: true,
        },
    });
}

async delete(id: string) {
    return this.prisma.document.delete({
        where: {
            id,
        },
    });
}


}