import type { ReactNode } from "react";

import BackButton from "./BackButton";
import StoreLogo from "../store/StoreLogo";

type PageHeaderProps = {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  action?: ReactNode;
};

export default function PageHeader({
  icon,
  title,
  subtitle,
  backTo = "/dashboard",
  backLabel = "Dashboard",
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow-xl">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <StoreLogo className="h-20 w-20 bg-white p-2" />

          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              {icon && <span>{icon}</span>}
              <span>{title}</span>
            </h1>

            {subtitle && (
              <p className="mt-2 text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-4">
          {action}

          <BackButton
            to={backTo}
            label={backLabel}
          />
        </div>
      </div>
    </header>
  );
}