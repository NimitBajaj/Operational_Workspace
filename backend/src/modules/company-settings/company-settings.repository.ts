import { Prisma, PrismaClient } from "@prisma/client";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class CompanySettingsRepository {
    constructor(
        private readonly prisma: PrismaExecutor
    ) {}

    async create(data: Prisma.CompanySettingsCreateInput) {
        return this.prisma.companySettings.create({
            data,
        });
    }

    async find() {
        return this.prisma.companySettings.findFirst();
    }

    async update(
        id: string,
        data: Prisma.CompanySettingsUpdateInput
    ) {
        return this.prisma.companySettings.update({
            where: {
                id,
            },
            data,
        });
    }
}