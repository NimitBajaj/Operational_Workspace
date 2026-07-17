import {prisma} from "../../lib/prisma";
import { Prisma, Product } from "@prisma/client";

export class ProductRepository {
    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return prisma.product.create({
            data
        });
    }

    async findByName(name: string): Promise<Product | null> { 
        return prisma.product.findFirst({
            where: { 
                name: { 
                    equals: name,
                    mode: "insensitive",
                }
            },
        });
}

async findById(id: string) {
    return prisma.product.findUnique({
        where: {id},
    });
}

async findAll() {
    return prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}

async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
        where: {id},
        data,
    });
}

async delete(id: string) {
    return prisma.product.delete({
        where: {id},
    });
}

}


