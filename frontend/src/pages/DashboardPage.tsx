import PageHeader from "@/components/common/PageHeader";
import DashboardStatCard from "@/features/dashboard/components/DashboardStatCard";
import { useDashboard } from "@/features/dashboard/useDashboard";
import RevenueChart from "@/features/dashboard/components/RevenueChart";
import RevenueSummary from "@/features/dashboard/components/RevenueSummary";
import RecentQuotations from "@/features/dashboard/components/RecentQuotations";
import {
  FileText,
  ClipboardList,
  Package,
  IndianRupee,
} from "lucide-react"

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();
  console.log("DATA:", data);
  console.log("LOADING:", isLoading);
console.log("ERROR:", isError);
console.log(error);
console.log(JSON.stringify(data?.recentQuotations, null, 2));
  if (isLoading){
    return <div>Loading dashboard...</div>
  }
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your business."
      />

      <div className="space-y-8">

        <section>

    <div className="grid grid-cols-4 gap-6">

        <DashboardStatCard
            title="Products"
            value={data?.stats?.products ?? 0}
            color="#2563EB"
            icon={<Package />}
            change="+12%"
        />

        <DashboardStatCard
            title="Proposal Requests"
            value={data?.stats?.proposalRequests ?? 0}
            color="#8B5CF6"
            icon={<ClipboardList />}
            change="+6%"
        />

        <DashboardStatCard
            title="Quotations"
            value={data?.stats?.quotations ?? 0}
            color="#10B981"
            icon={<FileText />}
            change="+8%"
        />

        <DashboardStatCard
            title="Revenue"
            value={data?.stats?.monthlyRevenue ?? 0}
            color="#F59E0B"
            icon={<IndianRupee />}
            change="+14%"
        />

    </div>

<div className="grid grid-cols-12 gap-6">

  {/* Revenue Chart */}
  <div className="col-span-8">
    <RevenueChart 
        data={data?.monthlyRevenue ?? []}/>
  </div>

  {/* Revenue Summary */}
  <div className="col-span-4">
    <RevenueSummary 
        revenue={data?.stats?.monthlyRevenue ?? 0}
        quotations={data?.stats?.quotations ?? 0}
        />
  </div>

  {/* Recent Quotations */}
  <div className="col-span-7">
    <RecentQuotations 
      quotations={
        data?.recentQuotations ?? []
      } />
  </div>

  {/* Recent Proposal Requests */}
  <div className="col-span-5">
    Recent Proposal Requests
  </div>

  {/* Quick Actions */}
  <div className="col-span-12">
    Quick Actions
  </div>

</div>


</section>

      </div>
    </>
  );
}