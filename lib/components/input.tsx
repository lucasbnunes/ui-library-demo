import { type InputHTMLAttributes, type ReactNode, type Ref } from "react";
import { cn } from "../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  startIcon,
  endIcon,
  disabled,
  className,
  ref,
  ...rest
}: InputProps) => {
  return (
    <div
      className={cn(
        "border-input bg-background ring-offset-background focus-within:ring-ring flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
        className,
      )}
    >
      {startIcon && (
        <span className="text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
          {startIcon}
        </span>
      )}
      <input
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none disabled:cursor-not-allowed"
        disabled={disabled}
        ref={ref}
        {...rest}
      />
      {endIcon && (
        <span className="text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
          {endIcon}
        </span>
      )}
    </div>
  );
};
