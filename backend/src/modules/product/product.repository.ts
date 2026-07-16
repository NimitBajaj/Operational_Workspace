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
}


