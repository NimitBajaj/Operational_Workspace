import { DashboardRepository } from "./dashboard.repository";

export class DashboardService {
    constructor(
        private readonly repository: DashboardRepository
    ) {}

    async getDashboard() {
    const [
    counts,
    recentQuotations,
] = await Promise.all([
    this.repository.getCounts(),
    this.repository.getRecentQuotations(),
]);

    const monthlyRevenue = [
        {
            month: "Jan",
            revenue: 12000,
        },
        {
            month: "Feb",
            revenue: 18500,
        },
        {
            month: "Mar",
            revenue: 24000,
        },
        {
            month: "Apr",
            revenue: 31000,
        },
        {
            month: "May",
            revenue: 27000,
        },
        {
            month: "Jun",
            revenue: 42000,
        },
    ];

    return {
        stats: {
            ...counts,

            monthlyRevenue: 182400,
        },

        recentQuotations,

        recentProposalRequests: [],

        monthlyRevenue,
    };
}
}