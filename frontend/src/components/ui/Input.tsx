import React from "react";
import { cn } from "@/lib/cn";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">

        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          className={cn(
            "w-full h-11 rounded-xl border bg-white",
            "border-slate-300",
            "px-4",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            "text-slate-900",
            "placeholder:text-slate-400",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-blue-500",
            "focus:border-blue-500",
            "disabled:bg-slate-100",
            "disabled:cursor-not-allowed",
            error &&
              "border-red-500 focus:ring-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}