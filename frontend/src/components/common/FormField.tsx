import type { ReactNode } from "react";

interface Props {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({
  label,
  error,
  required = false,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-2">

      <label className="text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}