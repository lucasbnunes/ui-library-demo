import type {
  SelectItemProps,
  SelectGroupProps as SelectPrimitiveGroupProps,
  SelectRootProps,
} from "@base-ui/react/select";
import { Select as SelectParts } from "@base-ui/react/select";
import { Children, type Ref } from "react";
import { cn } from "../utils/cn";

export interface SelectProps<Value> extends Omit<
  SelectRootProps<Value, false>,
  "multiple"
> {
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Classname applied to the trigger component */
  className?: string;
  /** Ref to the trigger button element. */
  ref?: Ref<HTMLButtonElement>;
}

function ChevronDown() {
  return (
    <svg
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export const Select = <Value extends string | null | undefined>({
  children,
  ref,
  className,
  placeholder,
  ...props
}: SelectProps<Value>) => {
  return (
    <SelectParts.Root {...props}>
      <SelectParts.Trigger
        ref={ref}
        className={cn(
          "border-input bg-background ring-offset-background focus-visible:ring-ring flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
          className,
        )}
      >
        <SelectParts.Value
          placeholder={placeholder}
          className="text-foreground placeholder:text-muted-foreground flex-1 text-left"
        />

        <SelectParts.Icon className="text-muted-foreground transition-transform duration-200 data-open:rotate-180 [&_svg]:size-4 [&_svg]:shrink-0">
          <ChevronDown />
        </SelectParts.Icon>
      </SelectParts.Trigger>

      <SelectParts.Portal>
        <SelectParts.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
          side="bottom"
          style={{ width: "var(--anchor-width)" }}
        >
          <SelectParts.Popup className="bg-popover text-popover-foreground z-50 max-h-60 overflow-y-auto rounded-lg border shadow-lg">
            <SelectParts.List className="p-1">
              {Children.count(children) ? (
                children
              ) : (
                <span className="text-muted-foreground block px-2 py-4 text-center text-sm">
                  No options available
                </span>
              )}
            </SelectParts.List>
          </SelectParts.Popup>
        </SelectParts.Positioner>
      </SelectParts.Portal>
    </SelectParts.Root>
  );
};

export interface SelectGroupProps extends SelectPrimitiveGroupProps {
  label: string;
}

export const SelectGroup = ({
  children,
  className,
  label,
  ...props
}: SelectGroupProps) => {
  return (
    <SelectParts.Group
      className={cn("not-first-of-type:mt-2", className)}
      {...props}
    >
      <SelectParts.GroupLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold">
        {label}
      </SelectParts.GroupLabel>

      {children}
    </SelectParts.Group>
  );
};

export type { SelectItemProps };

export const SelectItem = ({
  children,
  className,
  ...props
}: SelectItemProps) => {
  return (
    <SelectParts.Item
      {...props}
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
    >
      <SelectParts.ItemText>{children}</SelectParts.ItemText>
      <SelectParts.ItemIndicator className="ml-auto [&_svg]:size-4">
        <CheckIcon />
      </SelectParts.ItemIndicator>
    </SelectParts.Item>
  );
};
