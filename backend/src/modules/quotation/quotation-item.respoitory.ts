import { Prisma, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;


export class QuotationItemRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.QuotationItemCreateInput) {
    return this.prisma.quotationItem.create({
        data,
        include: {
            productVariant: true,
        },
    });
}

async createMany(data: Prisma.QuotationItemCreateManyInput[]) {
    return this.prisma.quotationItem.createMany({
        data,
    });
}

async findById(id: string) {
    return this.prisma.quotationItem.findUnique({
        where: { id },
        include: {
            productVariant: true,
            quotation: true,
        },
    });
}

async findByQuotation(quotationId: string) {
    return this.prisma.quotationItem.findMany({
        where: {
            quotationId,
        },
        include: {
            productVariant: true,
        },
    });
}

async update(
    id: string,
    data: Prisma.QuotationItemUpdateInput
) {
    return this.prisma.quotationItem.update({
        where: { id },
        data,
        include: {
            productVariant: true,
        },
    });
}

async delete(id: string) {
    return this.prisma.quotationItem.delete({
        where: { id },
    });
}

async deleteByQuotation(quotationId: string) {
    return this.prisma.quotationItem.deleteMany({
        where: {
            quotationId,
        },
    });
}


}