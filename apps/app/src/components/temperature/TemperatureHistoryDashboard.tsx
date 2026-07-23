import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getActiveTemperatureUnits,
  getTemperatureReadings,
  type TemperatureReading,
  type TemperatureUnit,
} from "../../services/temperatureService";

import TemperatureHistoryChart from "./TemperatureHistoryChart";

type Language =
  | "sv"
  | "en"
  | "pl";

type TemperatureHistoryDashboardProps = {
  language: Language;
};

type Period =
  | "7"
  | "30"
  | "90"
  | "365";

function TemperatureHistoryDashboard({
  language,
}: TemperatureHistoryDashboardProps) {
  const [
    units,
    setUnits,
  ] = useState<
    TemperatureUnit[]
  >([]);

  const [
    readings,
    setReadings,
  ] = useState<
    TemperatureReading[]
  >([]);

  const [
    selectedUnitId,
    setSelectedUnitId,
  ] = useState(
    ""
  );

  const [
    selectedPeriod,
    setSelectedPeriod,
  ] = useState<
    Period
  >(
    "30"
  );

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    error,
    setError,
  ] = useState(
    ""
  );

  const text = {
    sv: {
      loading:
        "Laddar temperaturhistorik...",

      loadError:
        "Temperaturhistoriken kunde inte hämtas. Försök igen.",

      noUnits:
        "Inga aktiva kylar eller frysar hittades.",

      selectUnit:
        "Välj kyl eller frys",

      period:
        "Tidsperiod",

      sevenDays:
        "7 dagar",

      thirtyDays:
        "30 dagar",

      threeMonths:
        "3 månader",

      twelveMonths:
        "12 månader",

      latest:
        "Senaste temperatur",

      lowest:
        "Lägsta temperatur",

      highest:
        "Högsta temperatur",

      deviations:
        "Avvikelser",

      readings:
        "Mätningar",

      noValue:
        "Ingen data",

      lastRegistered:
        "Senast registrerad",
    },

    en: {
      loading:
        "Loading temperature history...",

      loadError:
        "The temperature history could not be loaded. Please try again.",

      noUnits:
        "No active refrigerators or freezers were found.",

      selectUnit:
        "Select refrigerator or freezer",

      period:
        "Time period",

      sevenDays:
        "7 days",

      thirtyDays:
        "30 days",

      threeMonths:
        "3 months",

      twelveMonths:
        "12 months",

      latest:
        "Latest temperature",

      lowest:
        "Lowest temperature",

      highest:
        "Highest temperature",

      deviations:
        "Deviations",

      readings:
        "Readings",

      noValue:
        "No data",

      lastRegistered:
        "Last recorded",
    },

    pl: {
      loading:
        "Ładowanie historii temperatur...",

      loadError:
        "Nie udało się pobrać historii temperatur. Spróbuj ponownie.",

      noUnits:
        "Nie znaleziono aktywnych lodówek ani zamrażarek.",

      selectUnit:
        "Wybierz lodówkę lub zamrażarkę",

      period:
        "Okres",

      sevenDays:
        "7 dni",

      thirtyDays:
        "30 dni",

      threeMonths:
        "3 miesiące",

      twelveMonths:
        "12 miesięcy",

      latest:
        "Ostatnia temperatura",

      lowest:
        "Najniższa temperatura",

      highest:
        "Najwyższa temperatura",

      deviations:
        "Odchylenia",

      readings:
        "Pomiary",

      noValue:
        "Brak danych",

      lastRegistered:
        "Ostatni pomiar",
    },
  }[language];

  const locale =
    language === "sv"
      ? "sv-SE"
      : language === "pl"
        ? "pl-PL"
        : "en-GB";

  useEffect(() => {
    async function loadData() {
      try {
        setError(
          ""
        );

        const [
          loadedUnits,
          loadedReadings,
        ] =
          await Promise.all([
            getActiveTemperatureUnits(),
            getTemperatureReadings(
              500
            ),
          ]);

        setUnits(
          loadedUnits
        );

        setReadings(
          loadedReadings
        );

        if (
          loadedUnits.length >
            0
        ) {
          setSelectedUnitId(
            loadedUnits[
              0
            ].id
          );
        }
      } catch (
        loadError
      ) {
        console.error(
          "Failed to load temperature history:",
          loadError
        );

        setError(
          text.loadError
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadData();
  }, [
    text.loadError,
  ]);

  const selectedUnit =
    useMemo(
      () =>
        units.find(
          (
            unit
          ) =>
            unit.id ===
            selectedUnitId
        ) ??
        null,
      [
        selectedUnitId,
        units,
      ]
    );

  const filteredReadings =
    useMemo(
      () => {
        if (
          !selectedUnit
        ) {
          return [];
        }

        const earliestDate =
          new Date();

        earliestDate.setDate(
          earliestDate
            .getDate() -
            Number(
              selectedPeriod
            )
        );

        return readings
          .filter(
            (
              reading
            ) => {
              const created =
                new Date(
                  reading.created
                );

              return (
                reading.unit ===
                  selectedUnit.id &&
                created >=
                  earliestDate
              );
            }
          )
          .sort(
            (
              first,
              second
            ) =>
              new Date(
                first.created
              ).getTime() -
              new Date(
                second.created
              ).getTime()
          );
      },
      [
        readings,
        selectedPeriod,
        selectedUnit,
      ]
    );

  const statistics =
    useMemo(
      () => {
        if (
          filteredReadings
            .length === 0
        ) {
          return {
            latest:
              null,

            lowest:
              null,

            highest:
              null,

            deviationCount:
              0,

            latestDate:
              "",
          };
        }

        const temperatures =
          filteredReadings.map(
            (
              reading
            ) =>
              reading
                .temperature
          );

        const latestReading =
          filteredReadings[
            filteredReadings
              .length -
              1
          ];

        return {
          latest:
            latestReading
              .temperature,

          lowest:
            Math.min(
              ...temperatures
            ),

          highest:
            Math.max(
              ...temperatures
            ),

          deviationCount:
            filteredReadings
              .filter(
                (
                  reading
                ) =>
                  reading
                    .status ===
                  "deviation"
              )
              .length,

          latestDate:
            new Date(
              latestReading
                .created
            )
              .toLocaleString(
                locale,
                {
                  dateStyle:
                    "medium",

                  timeStyle:
                    "short",
                }
              ),
        };
      },
      [
        filteredReadings,
        locale,
      ]
    );

  function formatTemperature(
    temperature:
      number | null
  ) {
    if (
      temperature ===
      null
    ) {
      return text.noValue;
    }

    return `${temperature} °C`;
  }

  if (
    loading
  ) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">

        {text.loading}

      </div>
    );
  }

  if (
    error
  ) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center font-medium text-red-700 shadow"
      >

        {error}

      </div>
    );
  }

  if (
    units.length === 0
  ) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">

        {text.noUnits}

      </div>
    );
  }

  return (
    <div>

      <section className="mb-6 rounded-2xl bg-white p-5 shadow">

        <div className="grid gap-4 md:grid-cols-2">

          <label className="block">

            <span className="mb-2 block text-sm font-semibold">

              {text.selectUnit}

            </span>

            <select
              value={
                selectedUnitId
              }
              onChange={(
                event
              ) =>
                setSelectedUnitId(
                  event
                    .target
                    .value
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >

              {units.map(
                (
                  unit
                ) => (

                  <option
                    key={
                      unit.id
                    }
                    value={
                      unit.id
                    }
                  >

                    {
                      unit.type ===
                      "freezer"
                        ? "❄️ "
                        : "🧊 "
                    }

                    {
                      unit.name
                    }

                  </option>

                )
              )}

            </select>

          </label>

          <label className="block">

            <span className="mb-2 block text-sm font-semibold">

              {text.period}

            </span>

            <select
              value={
                selectedPeriod
              }
              onChange={(
                event
              ) =>
                setSelectedPeriod(
                  event
                    .target
                    .value as
                    Period
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >

              <option value="7">

                {
                  text
                    .sevenDays
                }

              </option>

              <option value="30">

                {
                  text
                    .thirtyDays
                }

              </option>

              <option value="90">

                {
                  text
                    .threeMonths
                }

              </option>

              <option value="365">

                {
                  text
                    .twelveMonths
                }

              </option>

            </select>

          </label>

        </div>

      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

          <p className="text-sm text-green-800">

            {text.latest}

          </p>

          <p className="mt-2 text-2xl font-bold text-green-900">

            {
              formatTemperature(
                statistics
                  .latest
              )
            }

          </p>

          {statistics
            .latestDate && (

            <p className="mt-2 text-xs text-green-800">

              {
                text
                  .lastRegistered
              }
              {": "}
              {
                statistics
                  .latestDate
              }

            </p>

          )}

        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">

          <p className="text-sm text-blue-800">

            {text.lowest}

          </p>

          <p className="mt-2 text-2xl font-bold text-blue-900">

            {
              formatTemperature(
                statistics
                  .lowest
              )
            }

          </p>

        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">

          <p className="text-sm text-orange-800">

            {text.highest}

          </p>

          <p className="mt-2 text-2xl font-bold text-orange-900">

            {
              formatTemperature(
                statistics
                  .highest
              )
            }

          </p>

        </div>

        <div
          className={
            statistics
              .deviationCount >
            0
              ? "rounded-2xl border border-red-200 bg-red-50 p-4"
              : "rounded-2xl border border-gray-200 bg-gray-50 p-4"
          }
        >

          <p
            className={
              statistics
                .deviationCount >
              0
                ? "text-sm text-red-800"
                : "text-sm text-gray-600"
            }
          >

            {
              text
                .deviations
            }

          </p>

          <p
            className={
              statistics
                .deviationCount >
              0
                ? "mt-2 text-2xl font-bold text-red-900"
                : "mt-2 text-2xl font-bold text-gray-800"
            }
          >

            {
              statistics
                .deviationCount
            }

          </p>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">

          <p className="text-sm text-gray-600">

            {text.readings}

          </p>

          <p className="mt-2 text-2xl font-bold">

            {
              filteredReadings
                .length
            }

          </p>

        </div>

      </section>

      {selectedUnit && (

        <TemperatureHistoryChart
          unit={
            selectedUnit
          }
          readings={
            filteredReadings
          }
          language={
            language
          }
        />

      )}

    </div>
  );
}

export default TemperatureHistoryDashboard;
