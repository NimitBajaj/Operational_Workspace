import { Card } from "@/components/ui/Card";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  children,
  action,
}: SectionCardProps) {
  return (
    <Card className="p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          )}

        </div>

        {action}

      </div>

      {children}

    </Card>
  );
}