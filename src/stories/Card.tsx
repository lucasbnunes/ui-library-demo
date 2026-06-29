import type { ReactNode } from "react";

export interface CardProps {
  /** The title of the card */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Whether to emphasize the card as featured */
  featured?: boolean;
  /** Accent color applied to the top border */
  accentColor?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional content rendered below the description */
  children?: ReactNode;
}

/** A versatile card component for showcasing content */
export const Card = ({
  title,
  description,
  featured = false,
  accentColor,
  onClick,
  children,
}: CardProps) => {
  const baseClasses = [
    "rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all",
    featured ? "ring-2 ring-blue-500 shadow-md" : "",
    onClick ? "cursor-pointer hover:shadow-md" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={baseClasses}
      style={
        accentColor
          ? { borderTopColor: accentColor, borderTopWidth: 4 }
          : undefined
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
