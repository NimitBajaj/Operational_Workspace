interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  const colors: Record<string, string> = {
    Draft: "bg-slate-100 text-slate-700",
    Sent: "bg-blue-100 text-blue-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}