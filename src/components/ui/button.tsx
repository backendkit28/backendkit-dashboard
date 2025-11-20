import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost'; size?: 'default' | 'sm' }>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50",
        variant === 'default' && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === 'ghost' && "hover:bg-accent hover:text-accent-foreground",
        size === 'default' && "h-10 px-4 py-2",
        size === 'sm' && "h-9 px-3",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };