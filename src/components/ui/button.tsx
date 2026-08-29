import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: "default" | "secondary";
}

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const colorClass = variant === "secondary" ? "bg-slate-200 text-slate-900 hover:bg-slate-300" : "bg-blue-600 text-white hover:bg-blue-700";
  return <button className={`rounded-md px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${colorClass} ${className}`} {...props} />;
}
