import { PrismaClient, Prisma } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class CustomerRepository {
    constructor(private readonly prisma: PrismaExecutor) {}

    async create(data: Prisma.CustomerCreateInput) {
        return this.prisma.customer.create({ data });
    }

    async findById(id: string) {
        return this.prisma.customer.findUnique({ where: { id } });
    }

    async findByEmail(email: string) {
        return this.prisma.customer.findUnique({ where: { email } });
    }

    async findbyPhone(phone: string) {
        return this.prisma.customer.findUnique({ where: { phone } });
    }

    async findbyName(name: string) {
        return this.prisma.customer.findMany({ where: { name } });
    }

    async findAll() {
        return this.prisma.customer.findMany({
            orderBy: {
                createdAt: "desc",
            },

    });
    }

    async update(id: string, data: Prisma.CustomerUpdateInput) {
        return this.prisma.customer.update({ where: { id }, data });
    }

    async delete(id: string) {
        return this.prisma.customer.delete({ where: { id } });
    }
}