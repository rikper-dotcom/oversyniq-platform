import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  variant?: "default" | "admin";
};

export default function DashboardActionCard({
  icon,
  title,
  description,
  onClick,
  variant = "default",
}: Props) {
  const borderClass =
    variant === "admin"
      ? "border border-amber-200"
      : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl",
        borderClass,
        "bg-white",
        "p-6",
        "text-left",
        "shadow",
        "transition",
        "hover:-translate-y-1",
        "hover:shadow-lg",
      ].join(" ")}
    >
      <div className="mb-4 text-4xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </button>
  );
}
