import { Link, useLocation } from "react-router-dom";

type IncidentNavigationProps = {
  onNewIncident: () => void;
};

export default function IncidentNavigation({
  onNewIncident,
}: IncidentNavigationProps) {
  const location = useLocation();

  const buttonClass = (active: boolean) =>
    active
      ? "rounded-xl bg-blue-600 px-4 py-2 font-medium text-white"
      : "rounded-xl bg-white px-4 py-2 font-medium shadow hover:bg-gray-100";

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <Link
          to="/incidents"
          className={buttonClass(
            location.pathname === "/incidents"
          )}
        >
          🚨 Aktiva
        </Link>

        <Link
          to="/incidents/history"
          className={buttonClass(
            location.pathname === "/incidents/history"
          )}
        >
          📚 Historik
        </Link>
      </div>

      <button
        type="button"
        onClick={onNewIncident}
        className="rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
      >
        ➕ Ny incident
      </button>
    </div>
  );
}
