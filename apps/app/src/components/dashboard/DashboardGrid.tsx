import type { ReactNode } from "react";

type DashboardGridProps = {
  children: ReactNode;
};

export default function DashboardGrid({
  children,
}: DashboardGridProps) {
  return (
    <div className="mt-5 grid gap-5 md:grid-cols-2">
      {children}
    </div>
  );
}
