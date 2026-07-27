import { Prisma, PrismaClient, ProductImage } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProductImageRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.ProductImageCreateInput) {
        return this.prisma.productImage.create({
            data,
            include: {
                product: true,
            },
        });
    }

    async findById(id: string) {
        return this.prisma.productImage.findUnique({
            where: { id },
            include: {
                product: true,
            },
        });
    }

    async findByProduct(productId: string) {
        return this.prisma.productImage.findMany({
            where: {
                productId,
            },
            orderBy: {
                sortOrder: "asc",
            },
        });
    }

    async findPrimary(productId: string) {
        return this.prisma.productImage.findFirst({
            where: {
                productId,
                isPrimary: true,
            },
        });
    }

    async clearPrimary(productId: string) {
        return this.prisma.productImage.updateMany({
            where: {
                productId,
            },
            data: {
                isPrimary: false,
            },
        });
    }

    async update(id: string, data: Prisma.ProductImageUpdateInput) {
        return this.prisma.productImage.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.productImage.delete({
            where: { id },
        });
    }

    async count(productId: string) {
        return this.prisma.productImage.count({
            where: {
                productId,
            },
        });
    }
}