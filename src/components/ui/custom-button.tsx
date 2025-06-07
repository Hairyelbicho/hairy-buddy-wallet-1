
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    title, 
    variant = 'primary', 
    size = 'medium', 
    disabled, 
    loading = false,
    icon,
    className,
    ...props 
  }, ref) => {
    // Base styles including shadow and focus states
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:scale-[0.98] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

    // Variant styles with proper hover and active states
    const variantStyles = {
      primary: "bg-hairy-primary text-white hover:bg-hairy-primary/90 active:bg-hairy-primary/80",
      secondary: "bg-hairy-tertiary text-white hover:bg-hairy-tertiary/90 active:bg-hairy-tertiary/80",
      outline: "border-2 border-hairy-primary text-hairy-primary hover:bg-hairy-primary/10 active:bg-hairy-primary/20",
      ghost: "text-hairy-primary hover:bg-hairy-primary/10 active:bg-hairy-primary/20 shadow-none hover:shadow-none"
    };

    // Size styles with adjusted padding and text sizes
    const sizeStyles = {
      small: "h-9 px-4 text-sm",
      medium: "h-12 px-6 text-base",
      large: "h-14 px-8 text-lg"
    };

    // Icon container styles based on loading state
    const iconContainerStyles = loading ? "mr-2 h-4 w-4" : "mr-2";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            icon && <span className={iconContainerStyles}>{icon}</span>
          )}
          <span>{title}</span>
        </span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };

