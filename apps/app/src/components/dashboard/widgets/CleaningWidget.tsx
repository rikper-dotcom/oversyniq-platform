import { useEffect, useState } from "react";

import {
  getCleaningDashboard,
  type CleaningDashboard,
} from "../../../services/cleaningService";

export default function CleaningWidget() {
  const [dashboard, setDashboard] =
    useState<CleaningDashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data =
          await getCleaningDashboard();

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
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          🧹 Städning
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
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          🧹 Städning
        </h3>

        <p className="mt-4 text-red-600">
          Kunde inte hämta städstatus.
        </p>
      </div>
    );
  }

  const latest = dashboard.latestSession;

  let statusText = "⚪ Ingen städning registrerad";
  let statusColor = "text-gray-600";
  let statusSubText = "";

  if (latest) {
    if (dashboard.percent === 100) {
      statusText = "🟢 Städning slutförd";
      statusColor = "text-green-600";
      statusSubText = "Alla uppgifter är utförda.";
    } else {
      const remaining =
        dashboard.totalTasks -
        dashboard.completedCount;

      statusText =
        "🟡 Städning ej fullständig";

      statusColor =
        "text-yellow-600";

      statusSubText =
        `${remaining} uppgift${
          remaining === 1 ? "" : "er"
        } återstår.`;
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow transition-shadow hover:shadow-lg">

      <h3 className="flex items-center gap-2 text-lg font-semibold">
        🧹 Städning
      </h3>

      <div className="mt-4 rounded-xl bg-gray-50 p-4">

        <p className={`font-semibold ${statusColor}`}>
          {statusText}
        </p>

        {statusSubText && (
          <p className="mt-1 text-sm text-gray-500">
            {statusSubText}
          </p>
        )}

      </div>

      <div className="mt-5 space-y-4 text-sm">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Utfört
          </span>

          <span className="font-semibold">
            {dashboard.completedCount} / {dashboard.totalTasks}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Klart
          </span>

          <span className="font-semibold">
            {dashboard.percent}%
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Vecka
          </span>

          <span className="font-semibold">
            Vecka {latest?.week ?? "-"}
            {dashboard.completedThisWeek
              ? " (aktuell)"
              : ""}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Utförd av
          </span>

          <span className="font-semibold">
            {latest?.cleanerName ?? "-"}
          </span>

        </div>

      </div>

      {latest?.comment?.trim() && (

        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">

          <p className="mb-2 text-sm font-semibold text-gray-700">
            Kommentar
          </p>

          <p className="text-sm text-gray-600 italic">
            "{latest.comment}"
          </p>

        </div>

      )}

    </div>
  );
}