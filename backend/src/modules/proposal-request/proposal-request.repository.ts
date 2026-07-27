import { Prisma, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProposalRequestRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.ProposalRequestCreateInput) {
        return this.prisma.proposalRequest.create({
            data,
            include: {
                items: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findById(id: string) {
        return this.prisma.proposalRequest.findUnique({
            where: {
                id,
            },
            include: {
                items: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.proposalRequest.findMany({
            include: {
                items: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async update(
        id: string,
        data: Prisma.ProposalRequestUpdateInput
    ) {
        return this.prisma.proposalRequest.update({
            where: {
                id,
            },
            data,
            include: {
                items: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async delete(id: string) {
        return this.prisma.proposalRequest.delete({
            where: {
                id,
            },
        });
    }

    async markConverted(
    id: string,
    quotationId: string
) {
    return this.prisma.proposalRequest.update({
        where: { id },
        data: {
            status: "CONVERTED",
            quotationId,
            convertedAt: new Date(),
        },
    });
}

}