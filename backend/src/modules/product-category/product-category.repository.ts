import { Prisma, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class ProductCategoryRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.ProductCategoryCreateInput) {
        return this.prisma.productCategory.create({
            data
        });
    }

    async findAll() {
        return this.prisma.productCategory.findMany({
            orderBy: {
                sortOrder: "asc"
            }
        });
    }

 async findAllActive() {
    return this.prisma.productCategory.findMany({
        where: {
            active: true
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
}
   
    async findById(id: string) {
        return this.prisma.productCategory.findUnique({
            where: {
                id
            }
        });
    }

    async findBySlug(slug: string) {
        return this.prisma.productCategory.findUnique({
            where: {
                slug
            }
        });
    }

    async findByName(name: string) {
        return this.prisma.productCategory.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        });
    }

    async update(
        id: string,
        data: Prisma.ProductCategoryUpdateInput
    ) {
        return this.prisma.productCategory.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: string) {
        return this.prisma.productCategory.delete({
            where: {
                id
            }
        });
    }
}