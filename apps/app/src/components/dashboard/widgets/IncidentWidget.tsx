import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getIncidentDashboard,
  type IncidentDashboard,
} from "../../../services/incidentService";

export default function IncidentWidget() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState<IncidentDashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data =
          await getIncidentDashboard();

        setDashboard(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-lg font-semibold">
          ⚠ Incidenter
        </h3>

        <p className="mt-4 text-gray-500">
          Laddar...
        </p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-lg font-semibold">
          ⚠ Incidenter
        </h3>

        <p className="mt-4 text-red-600">
          Kunde inte läsa incidenter.
        </p>
      </div>
    );
  }

  const latest = dashboard.latestIncident;

  let statusText = "🟢 Inga öppna incidenter";
  let statusColor = "text-green-600";

  if (dashboard.highPriority > 0) {
    statusText = "🔴 Högprioriterade incidenter";
    statusColor = "text-red-600";
  } else if (
    dashboard.open > 0 ||
    dashboard.inProgress > 0
  ) {
    statusText = "🟡 Öppna incidenter";
    statusColor = "text-yellow-600";
  }

  return (
    <button
      type="button"
      onClick={() => navigate("/incidents")}
      className="w-full rounded-2xl bg-white p-6 text-left shadow transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">

        <h3 className="flex items-center gap-2 text-lg font-semibold">
          ⚠ Incidenter
        </h3>

        <span className="text-xl text-gray-400">
          →
        </span>

      </div>

      <div className="mt-4 rounded-xl bg-gray-50 p-4">

        <p className={`font-semibold ${statusColor}`}>
          {statusText}
        </p>

      </div>

      <div className="mt-5 space-y-4 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Öppna
          </span>

          <span className="font-semibold">
            {dashboard.open}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Pågående
          </span>

          <span className="font-semibold">
            {dashboard.inProgress}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Hög prioritet
          </span>

          <span className="font-semibold text-red-600">
            {dashboard.highPriority}
          </span>
        </div>

      </div>

      {latest && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">

          <p className="text-sm font-semibold text-gray-600">
            Senast rapporterad
          </p>

          <p className="mt-2 font-medium">
            {latest.title}
          </p>

          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>{latest.category}</span>
            <span>{latest.priority}</span>
          </div>

        </div>
      )}
    </button>
  );
}