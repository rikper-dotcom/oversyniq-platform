import type { ReactNode } from "react";

type DashboardHeaderProps = {
  logo: string;
  welcome: string;
  displayName: string;
  storeName: ReactNode;
  roleName: string;
  logoutText: string;
  onLogout: () => void;
};

export default function DashboardHeader({
  logo,
  welcome,
  displayName,
  storeName,
  roleName,
  logoutText,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 rounded-3xl bg-white p-6 shadow-xl">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <img
          src={logo}
          alt="24 Sju"
          className="h-20 w-20 object-contain"
        />

        <div className="flex-1 text-center sm:text-left">
          <p className="text-gray-500">
            {welcome}
          </p>

          <h1 className="text-3xl font-bold">
            {displayName}
          </h1>

          <p className="mt-2 text-gray-500">
            {storeName}
          </p>

          <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {roleName}
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-gray-200 px-5 py-3 font-medium transition hover:bg-gray-300"
        >
          ↪ {logoutText}
        </button>
      </div>
    </div>
  );
}
