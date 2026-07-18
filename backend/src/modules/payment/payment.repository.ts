import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class PaymentRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

async create(data: Prisma.PaymentCreateInput) {
    return this.prisma.payment.create({
        data,
        include: {
            project: true,
            quotation: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.payment.findUnique({
        where: { id },
        include: {
            project: true,
            quotation: true,
        },
    });
}

async findAll() {
    return this.prisma.payment.findMany({
        include: {
            project: true,
            quotation: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByProject(projectId: string) {
    return this.prisma.payment.findMany({
        where: {
            projectId,
        },
        include: {
            quotation: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByQuotation(quotationId: string) {
    return this.prisma.payment.findMany({
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
    data: Prisma.PaymentUpdateInput
) {
    return this.prisma.payment.update({
        where: {
            id,
        },
        data,
        include: {
            project: true,
            quotation: true,
        },
    });
}

async delete(id: string) {
    return this.prisma.payment.delete({
        where: {
            id,
        },
    });
}


}