import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant="primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-white/40",
        variant === "primary" && "bg-white text-black hover:opacity-90",
        variant === "ghost" && "bg-white/10 text-white hover:bg-white/15",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
