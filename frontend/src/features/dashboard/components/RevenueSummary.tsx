import { Card } from "@/components/ui/Card";

interface Props {
  revenue: number;
  quotations: number;
}

export default function RevenueSummary({
  revenue,
  quotations,
}: Props) {
  return (
    <Card className="p-6 h-[380px]">

      <h2 className="text-xl font-semibold">
        Revenue Summary
      </h2>

      <div className="mt-8 space-y-8">

        <div>

          <p className="text-sm text-slate-500">
            This Month
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            ₹{revenue.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Quotations
          </p>

          <h3 className="mt-2 text-2xl font-semibold">
            {quotations}
          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Growth
          </p>

          <h3 className="mt-2 text-emerald-600 text-2xl font-semibold">
            +14%
          </h3>

        </div>

      </div>

    </Card>
  );
}