import {prisma} from "../../lib/prisma";
import { Prisma, Product, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProductRepository {
    constructor (private readonly prisma: PrismaExecutor){}

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data
        });
    }

    async findBySlug(slug: string): Promise<Product |null> {
        return this.prisma.product.findUnique({
            where: {
                slug
            }
        });
    }

    async countByCategory(categoryId: string): Promise<number> {
    return this.prisma.product.count({
        where: {
            categoryId,
        },
    });
}
    
    async findByName(name: string): Promise<Product | null> { 
        return this.prisma.product.findFirst({
            where: { 
                name: { 
                    equals: name,
                    mode: "insensitive",
                }
            },
        });
}

async findById(id: string) {
    return this.prisma.product.findUnique({
        where: {id},
        include: {
            category: true,
        },
    });
}

async findAll() {
    return this.prisma.product.findMany({ 
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
        where: {id},
        data,
    });
}

async delete(id: string) {
    return this.prisma.product.delete({
        where: {id},
    });
}

}


