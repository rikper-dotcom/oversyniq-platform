import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "../../hooks/useTranslation";

import {
  getActiveTemperatureDeviations,
  type TemperatureDeviation,
} from "../../services/temperatureService";

type TemperatureStatus =
  | "normal"
  | "warning"
  | "critical";

function getLocale(language: string) {
  if (language === "sv") {
    return "sv-SE";
  }

  if (language === "pl") {
    return "pl-PL";
  }

  return "en-GB";
}

function getSummaryStatus(
  deviations: TemperatureDeviation[]
): TemperatureStatus {
  if (deviations.length === 0) {
    return "normal";
  }

  if (
    deviations.some(
      ({ severity }) => severity === "critical"
    )
  ) {
    return "critical";
  }

  return "warning";
}

function getStatusClasses(status: TemperatureStatus) {
  if (status === "normal") {
    return "border-green-200 bg-green-50 text-green-800";
  }

  if (status === "critical") {
    return "border-red-200 bg-red-50 text-red-800";
  }

  return "border-amber-200 bg-amber-50 text-amber-800";
}

function TemperatureStatusOverview() {
  const navigate = useNavigate();
  const { language, t } = useTranslation();

  const [deviations, setDeviations] =
    useState<TemperatureDeviation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const locale = getLocale(language);

  useEffect(() => {
    async function loadDeviations() {
      try {
        setError("");

        const loadedDeviations =
          await getActiveTemperatureDeviations();

        setDeviations(loadedDeviations);
      } catch (loadError) {
        console.error(
          "Failed to load temperature deviations:",
          loadError
        );

        setError(
          t.temperature.status.loadError
        );
      } finally {
        setLoading(false);
      }
    }

    loadDeviations();
  }, [t.temperature.status.loadError]);

  const summaryStatus =
    getSummaryStatus(deviations);

  const statusLabels: Record<
    TemperatureStatus,
    string
  > = {
    normal: t.temperature.status.normal,
    warning: t.temperature.status.warning,
    critical: t.temperature.status.critical,
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">
        {t.temperature.status.loading}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center font-medium text-red-700 shadow"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-6 shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">
              {t.temperature.status.activeDeviations}
            </p>

            <p className="mt-1 text-4xl font-bold">
              {deviations.length}
            </p>
          </div>

          <span
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClasses(summaryStatus)}`}
          >
            {statusLabels[summaryStatus]}
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">
          {t.temperature.status.activeDeviations}
        </h2>

        {deviations.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">
            {t.temperature.status.noActiveDeviations}
          </div>
        ) : (
          <div className="space-y-4">
            {deviations.map(
              ({
                unit,
                reading,
                severity,
              }) => (
                <article
                  key={reading.id}
                  className="rounded-2xl bg-white p-6 shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">
                        {unit.type === "freezer" ? "❄️" : "🧊"}{" "}
                        {unit.name}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-sm font-semibold ${getStatusClasses(severity)}`}
                    >
                      {statusLabels[severity]}
                    </span>
                  </div>

                  <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <dt className="text-sm text-gray-500">
                        {t.temperature.status.latestTemperature}
                      </dt>

                      <dd className="mt-1 text-lg font-semibold">
                        {reading.temperature} °C
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">
                        {t.temperature.status.expectedRange}
                      </dt>

                      <dd className="mt-1 text-lg font-semibold">
                        {unit.minTemperature} °C – {unit.maxTemperature} °C
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm text-gray-500">
                        {t.temperature.status.latestReading}
                      </dt>

                      <dd className="mt-1 text-lg font-semibold">
                        {new Date(reading.created).toLocaleString(
                          locale,
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }
                        )}
                      </dd>
                    </div>
                  </dl>
                </article>
              )
            )}
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">
          {t.temperature.status.quickActions}
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/admin/temperature-history")}
            className="rounded-xl bg-gray-900 px-5 py-4 text-left font-semibold text-white transition hover:bg-black"
          >
            {t.temperature.status.viewHistory}
          </button>

          <button
            type="button"
            onClick={() => navigate("/temperature")}
            className="rounded-xl bg-blue-600 px-5 py-4 text-left font-semibold text-white transition hover:bg-blue-700"
          >
            {t.temperature.status.logNewTemperature}
          </button>

          <button
            type="button"
            disabled
            className="rounded-xl bg-gray-200 px-5 py-4 text-left font-semibold text-gray-500"
          >
            {t.temperature.status.manageUnits}

            <span className="mt-1 block text-sm font-normal">
              {t.temperature.status.futureFeature}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default TemperatureStatusOverview;
