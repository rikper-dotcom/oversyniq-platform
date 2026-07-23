import type { ReactNode } from "react";

type DashboardCardProps = {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
  badge?: string;
  borderClassName?: string;
  children?: ReactNode;
};

export default function DashboardCard({
  icon,
  title,
  description,
  onClick,
  badge,
  borderClassName = "",
  children,
}: DashboardCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-lg ${borderClassName}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="text-4xl">
          {icon}
        </span>

        {badge && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

      {children}
    </button>
  );
}
