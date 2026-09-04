import { cn } from "@/lib/cn";

type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants = {
  success:
    "bg-emerald-100 text-emerald-700",

  warning:
    "bg-amber-100 text-amber-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-blue-100 text-blue-700",

  neutral:
    "bg-slate-100 text-slate-700",
};

export default function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "rounded-full",
        "px-3 py-1",
        "text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}