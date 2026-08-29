import type { LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className = "", ...props }: LabelProps) {
  return <label className={`text-sm font-semibold text-slate-700 dark:text-slate-200 ${className}`} {...props} />;
}
