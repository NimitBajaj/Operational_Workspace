import { Prisma, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProductVariantRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.ProductVariantCreateInput) {
    return this.prisma.productVariant.create({
        data,
        include: {
            product: {
                include: {
                    category: true,
                    images: true,
                },
            },
        },
    });
}

async findById(id: string) {
    return this.prisma.productVariant.findUnique({
        where: { id },
        include: {
            product: {
                include: {
                    category: true,
                    images: true,
                    },
                },
            },
    });
}

async findBySku(sku: string) {
    return this.prisma.productVariant.findUnique({
        where: { sku },
    });
}

async findAll() {
    return this.prisma.productVariant.findMany({
        include: {
            product: {
                include: {
                    category: true,
                    images: true,                   
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async findByProduct(productId: string) {
    return this.prisma.productVariant.findMany({
        where: {
            productId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

async update(
    id: string,
    data: Prisma.ProductVariantUpdateInput
) {
    return this.prisma.productVariant.update({
        where: { id },
        data,
        include: {
            product: {
                include: {
                    category: true,
                    images: true,
                },
            },
        },
    });
}

async delete(id: string) {
    return this.prisma.productVariant.delete({
        where: { id },
    });
}

}