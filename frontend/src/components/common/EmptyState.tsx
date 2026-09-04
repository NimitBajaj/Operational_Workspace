import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <Inbox
        className="text-slate-300"
        size={48}
      />

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {description}
      </p>

    </div>
  );
}