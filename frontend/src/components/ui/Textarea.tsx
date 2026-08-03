import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">

        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={`
            w-full
            rounded-lg
            border
            border-slate-300
            px-3
            py-2
            min-h-28
            resize-y
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;