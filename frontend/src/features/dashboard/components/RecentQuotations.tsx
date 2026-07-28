import { Card } from "@/components/ui/Card";

interface Quotation {
  id: string;
  quotationNumber: string;
  total: number;
  status: string;

  project: {
    customer: {
      companyName: string;
    };
  };
}

interface Props {
  quotations: Quotation[];
}

export default function RecentQuotations({
  quotations,
}: Props) {
  return (
    <Card className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-semibold">
          Recent Quotations
        </h2>

        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left pb-3">
              Customer
            </th>

            <th className="text-left pb-3">
              Quotation
            </th>

            <th className="text-left pb-3">
              Status
            </th>

            <th className="text-right pb-3">
              Amount
            </th>

          </tr>

        </thead>

        <tbody>

  {quotations.length === 0 ? (

    <tr>

      <td
        colSpan={4}
        className="py-12 text-center text-slate-400"
      >
        No quotations found.
      </td>

    </tr>

  ) : (

    quotations.map((quotation) => (

      <tr
        key={quotation.id}
        className="border-b hover:bg-slate-50 transition"
      >

        <td className="py-4">
          {quotation.project.customer.companyName}
        </td>

        <td>
          {quotation.quotationNumber}
        </td>

        <td>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
            {quotation.status}
          </span>

        </td>

        <td className="text-right font-semibold">
          ₹{Number(quotation.total).toLocaleString()}
        </td>

      </tr>

    ))

  )}

</tbody>

      </table>

    </Card>
  );
}