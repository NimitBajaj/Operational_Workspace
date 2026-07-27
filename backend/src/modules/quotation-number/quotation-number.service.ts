import { PrismaClient } from "@prisma/client";

export class QuotationNumberService {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async generate() {
        const year = new Date().getFullYear();

        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year + 1, 0, 1);

        const count = await this.prisma.quotation.count({
            where: {
                createdAt: {
                    gte: startOfYear,
                    lt: endOfYear,
                },
            },
        });

        const sequence = String(count + 1).padStart(6, "0");

        return `QT-${year}-${sequence}`;
    }
}