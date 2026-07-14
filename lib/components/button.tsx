import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type Ref } from "react";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        destructive: "",
      },
      variant: {
        solid: "",
        ghost: "",
        outline: "",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "solid",
        class:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
      },
      {
        color: "secondary",
        variant: "solid",
        class:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
      },
      {
        color: "destructive",
        variant: "solid",
        class:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
      },
      {
        color: "primary",
        variant: "ghost",
        class:
          "text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      {
        color: "secondary",
        variant: "ghost",
        class:
          "text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      {
        color: "destructive",
        variant: "ghost",
        class:
          "text-destructive hover:bg-destructive/10 active:bg-destructive/15",
      },
      {
        color: "primary",
        variant: "outline",
        class:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      {
        color: "secondary",
        variant: "outline",
        class:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      {
        color: "destructive",
        variant: "outline",
        class:
          "border border-destructive/50 bg-background text-destructive hover:bg-destructive/10 active:bg-destructive/15",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  ref?: Ref<HTMLButtonElement>;
}

export const Button = ({
  color = "primary",
  variant = "solid",
  size = "md",
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  ref,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ color, variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      ref={ref}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
};

function Spinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
