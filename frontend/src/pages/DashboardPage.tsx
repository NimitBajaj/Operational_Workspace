import PageHeader from "@/components/common/PageHeader";
import DashboardStatCard from "@/features/dashboard/components/DashboardStatCard";
import {
  FileText,
  ClipboardList,
  Package,
  IndianRupee,
} from "lucide-react"

export default function DashboardPage() {
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
            value={124}
            color="#2563EB"
            icon={<Package />}
            change="+12%"
        />

        <DashboardStatCard
            title="Proposal Requests"
            value={28}
            color="#8B5CF6"
            icon={<ClipboardList />}
            change="+6%"
        />

        <DashboardStatCard
            title="Quotations"
            value={19}
            color="#10B981"
            icon={<FileText />}
            change="+8%"
        />

        <DashboardStatCard
            title="Revenue"
            value={182400}
            color="#F59E0B"
            icon={<IndianRupee />}
            change="+14%"
        />

    </div>

</section>

        <section>
          Revenue Chart
        </section>

        <section>
          Recent Quotations
        </section>

        <section>
          Recent Proposal Requests
        </section>

        <section>
          Quick Actions
        </section>

      </div>
    </>
  );
}