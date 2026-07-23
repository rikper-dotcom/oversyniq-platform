import type { ReactNode } from "react";

interface WidgetCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

export default function WidgetCard({
  title,
  icon,
  children,
  action,
}: WidgetCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {action}
      </div>

      <div className="p-4">
        {children}
      </div>
    </div>
  );
}