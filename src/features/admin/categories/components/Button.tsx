import React, { forwardRef } from "react";
import { PlusCircle } from "lucide-react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800 border border-transparent",
  outline: "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 border border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled,
      icon,
      type = "button",
      variant = "primary",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {icon && <PlusCircle className="w-3.5 h-3.5 shrink-0" />}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;