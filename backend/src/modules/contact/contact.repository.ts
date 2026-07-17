import { Prisma, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ContactRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.ContactCreateInput) {
    return this.prisma.contact.create({
        data,
        include: {
            customer: true,
        },
    });
}

async findById(id: string) {
    return this.prisma.contact.findUnique({
        where: { id },
        include: {
            customer: true,
        },
    });
}

async findAll() {
    return this.prisma.contact.findMany({
        include: {
            customer: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findPrimaryByCustomer(customerId: string) {
    return this.prisma.contact.findFirst({
        where: {
            customerId,
            isPrimary: true,
        },
    });
}

async update(
    id: string,
    data: Prisma.ContactUpdateInput
) {
    return this.prisma.contact.update({
        where: { id },
        data,
        include: {
            customer: true,
        },
    });
}

async updatePrimaryStatus(
    id: string,
    isPrimary: boolean
) {
    return this.prisma.contact.update({
        where: { id },
        data: {
            isPrimary,
        },
    });
}

async delete(id: string) {
    return this.prisma.contact.delete({
        where: { id },
    });
}

}