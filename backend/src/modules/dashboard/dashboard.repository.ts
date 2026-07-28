import { PrismaClient } from "@prisma/client";

export class DashboardRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async getCounts() {
        const [
            products,
            customers,
            proposalRequests,
            quotations,
        ] = await Promise.all([
            this.prisma.product.count(),
            this.prisma.customer.count(),
            this.prisma.proposalRequest.count(),
            this.prisma.quotation.count(),
        ]);

        return {
            products,
            customers,
            proposalRequests,
            quotations,
        };
    }
}