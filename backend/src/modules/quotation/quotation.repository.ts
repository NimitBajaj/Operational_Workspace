import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;


export class QuotationRepository{
    constructor( private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.QuotationCreateInput) {
    return this.prisma.quotation.create({
        data,
        include: {
            items: true,
            project: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.quotation.findUnique({
        where: { id },
        include: {
            project: true,
            items: {
                include: {
                    productVariant: true,
                },
            },
        },
    });
}

async findAll() {
    return this.prisma.quotation.findMany({
        include: {
            project: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findCurrentByProject(projectId: string) {
    return this.prisma.quotation.findFirst({
        where: {
            projectId,
            isCurrent: true,
        },
    });
}

async update(
    id: string,
    data: Prisma.QuotationUpdateInput
) {
    return this.prisma.quotation.update({
        where: { id },
        data,
        include: {
            items: {
                include: {
                    productVariant: true,
                },
            },
            project: true,
        },
    });
}

async delete(id: string) {
    return this.prisma.quotation.delete({
        where: { id },
    });
}

}