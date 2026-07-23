import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTemperatureDashboard,
  type TemperatureDashboard,
} from "../../../services/temperatureService";

function formatDate(date: string | null) {
  if (!date) {
    return "Ingen registrering";
  }

  return new Date(date).toLocaleString("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function TemperatureWidget() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState<TemperatureDashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data =
          await getTemperatureDashboard();

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
          🌡️ Temperatur
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
          🌡️ Temperatur
        </h3>

        <p className="mt-4 text-red-600">
          Kunde inte hämta temperaturstatus.
        </p>
      </div>
    );
  }

  let statusText = "🟢 Alla enheter godkända";
  let statusColor = "text-green-600";
  let statusSubText =
    "Samtliga enheter ligger inom godkänt temperaturintervall.";

  if (!dashboard.allOk) {
    statusText =
      dashboard.deviations === 1
        ? "🔴 1 temperaturavvikelse"
        : `🔴 ${dashboard.deviations} temperaturavvikelser`;

    statusColor = "text-red-600";

    statusSubText =
      "Senaste kontrollen innehåller avvikelser.";
  }

  return (
    <button
      type="button"
      onClick={() => navigate("/temperature/status")}
      className="w-full rounded-2xl bg-white p-6 text-left shadow transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">

        <h3 className="flex items-center gap-2 text-lg font-semibold">
          🌡️ Temperatur
        </h3>

        <span className="text-xl text-gray-400">
          →
        </span>

      </div>

      <div className="mt-4 rounded-xl bg-gray-50 p-4">

        <p className={`font-semibold ${statusColor}`}>
          {statusText}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {statusSubText}
        </p>

      </div>

      <div className="mt-5 space-y-4 text-sm">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Kontrollerade
          </span>

          <span className="font-semibold">
            {dashboard.checkedUnits} / {dashboard.totalUnits}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Avvikelser
          </span>

          <span
            className={`font-semibold ${
              dashboard.deviations > 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {dashboard.deviations}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Status
          </span>

          <span
            className={`font-semibold ${statusColor}`}
          >
            {dashboard.allOk ? "OK" : "Åtgärd krävs"}
          </span>

        </div>

      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">

        <p className="text-sm font-semibold text-gray-600">
          Senaste kontroll
        </p>

        <p className="mt-2 font-medium">
          {formatDate(dashboard.latestCheck)}
        </p>

        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">

          <span>
            {dashboard.checkedBy ?? "-"}
          </span>

          <span>
            {dashboard.checkedUnits}/{dashboard.totalUnits}
          </span>

        </div>

      </div>

    </button>
  );
}