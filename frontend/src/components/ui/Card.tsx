import React from "react";
import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        "border border-slate-200",
        "bg-white",
        "shadow-sm",
        "transition-shadow duration-200",
        "hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-5 border-b border-slate-100",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({
  className,
  ...props
}: CardTitleProps) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-slate-900",
        className
      )}
      {...props}
    />
  );
}

interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  className,
  ...props
}: CardContentProps) {
  return (
    <div
      className={cn(
        "p-6",
        className
      )}
      {...props}
    />
  );
}

interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-slate-100",
        "flex items-center justify-end gap-3",
        className
      )}
      {...props}
    />
  );
}