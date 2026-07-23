import {
  useMemo,
  useState,
} from "react";

import type {
  StaffMember,
} from "../../services/adminTimeService";

import type {
  TimeEntry,
} from "../../services/timeService";

import {
  exportTimeReportsToCsv,
} from "../../services/timeExportService";

type Language =
  | "sv"
  | "en"
  | "pl";

type AdminTimeExportProps = {
  staffMembers: StaffMember[];
  timeEntries: TimeEntry[];
  language: Language;
};

function AdminTimeExport({
  staffMembers,
  timeEntries,
  language,
}: AdminTimeExportProps) {
  const currentDate =
    new Date();

  const [
    selectedYear,
    setSelectedYear,
  ] = useState(
    currentDate.getFullYear()
  );

  const [
    selectedMonth,
    setSelectedMonth,
  ] = useState(
    currentDate.getMonth()
  );

  const text = {
    sv: {
      title:
        "Exportera tidsrapporter",

      description:
        "Välj månad och skapa ett löneunderlag som kan öppnas direkt i Excel.",

      month:
        "Månad",

      year:
        "År",

      export:
        "Exportera CSV",

      shifts:
        "arbetspass",

      noEntries:
        "Det finns inga avslutade arbetspass för den valda månaden.",

      fileInfo:
        "CSV-filen öppnas i Excel och innehåller arbetspass, tider, kommentarer och totalsummor per anställd.",
    },

    en: {
      title:
        "Export time reports",

      description:
        "Select a month and create a payroll report that can be opened directly in Excel.",

      month:
        "Month",

      year:
        "Year",

      export:
        "Export CSV",

      shifts:
        "work shifts",

      noEntries:
        "There are no completed work shifts for the selected month.",

      fileInfo:
        "The CSV file opens in Excel and includes work shifts, times, comments and totals for each staff member.",
    },

    pl: {
      title:
        "Eksportuj ewidencję czasu",

      description:
        "Wybierz miesiąc i utwórz zestawienie płacowe, które można otworzyć bezpośrednio w programie Excel.",

      month:
        "Miesiąc",

      year:
        "Rok",

      export:
        "Eksportuj CSV",

      shifts:
        "zmian",

      noEntries:
        "Brak zakończonych zmian w wybranym miesiącu.",

      fileInfo:
        "Plik CSV można otworzyć w programie Excel. Zawiera zmiany, godziny, komentarze i sumy dla każdego pracownika.",
    },
  }[language];

  const locale =
    language === "sv"
      ? "sv-SE"
      : language === "pl"
        ? "pl-PL"
        : "en-GB";

  const monthOptions =
    useMemo(
      () =>
        Array.from(
          {
            length: 12,
          },
          (
            _,
            monthIndex
          ) => {
            const monthName =
              new Date(
                2026,
                monthIndex,
                1
              ).toLocaleDateString(
                locale,
                {
                  month:
                    "long",
                }
              );

            return {
              value:
                monthIndex,

              label:
                monthName
                  .charAt(
                    0
                  )
                  .toUpperCase() +
                monthName.slice(
                  1
                ),
            };
          }
        ),
      [
        locale,
      ]
    );

  const yearOptions =
    useMemo(
      () => {
        const years =
          new Set<
            number
          >();

        years.add(
          currentDate
            .getFullYear()
        );

        timeEntries.forEach(
          (
            entry
          ) => {
            const date =
              new Date(
                entry.startTime
              );

            if (
              !Number.isNaN(
                date.getTime()
              )
            ) {
              years.add(
                date.getFullYear()
              );
            }
          }
        );

        return Array.from(
          years
        ).sort(
          (
            first,
            second
          ) =>
            second -
            first
        );
      },
      [
        timeEntries,
      ]
    );

  const selectedEntries =
    useMemo(
      () =>
        timeEntries.filter(
          (
            entry
          ) => {
            if (
              entry.status !==
              "completed"
            ) {
              return false;
            }

            const date =
              new Date(
                entry.startTime
              );

            return (
              date.getFullYear() ===
                selectedYear &&
              date.getMonth() ===
                selectedMonth
            );
          }
        ),
      [
        selectedMonth,
        selectedYear,
        timeEntries,
      ]
    );

  function handleExport() {
    if (
      selectedEntries.length ===
      0
    ) {
      return;
    }

    exportTimeReportsToCsv({
      staffMembers,
      timeEntries,
      year:
        selectedYear,
      month:
        selectedMonth,
      language,
    });
  }

  return (
    <section className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div className="max-w-2xl">

          <div className="flex items-center gap-3">

            <span
              className="text-3xl"
              aria-hidden="true"
            >
              📄
            </span>

            <h2 className="text-xl font-bold text-green-900">

              {text.title}

            </h2>

          </div>

          <p className="mt-3 text-sm text-green-900/70">

            {text.description}

          </p>

        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-96">

          <label className="block">

            <span className="mb-1 block text-sm font-medium text-green-900">

              {text.month}

            </span>

            <select
              value={
                selectedMonth
              }
              onChange={(
                event
              ) =>
                setSelectedMonth(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
              className="w-full rounded-xl border border-green-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >

              {monthOptions.map(
                (
                  month
                ) => (

                  <option
                    key={
                      month.value
                    }
                    value={
                      month.value
                    }
                  >

                    {
                      month.label
                    }

                  </option>

                )
              )}

            </select>

          </label>

          <label className="block">

            <span className="mb-1 block text-sm font-medium text-green-900">

              {text.year}

            </span>

            <select
              value={
                selectedYear
              }
              onChange={(
                event
              ) =>
                setSelectedYear(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
              className="w-full rounded-xl border border-green-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >

              {yearOptions.map(
                (
                  year
                ) => (

                  <option
                    key={
                      year
                    }
                    value={
                      year
                    }
                  >

                    {year}

                  </option>

                )
              )}

            </select>

          </label>

        </div>

      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-green-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="font-semibold text-green-900">

            {
              selectedEntries
                .length
            }{" "}

            {text.shifts}

          </p>

          <p className="mt-1 text-sm text-green-900/70">

            {
              selectedEntries
                .length === 0
                ? text.noEntries
                : text.fileInfo
            }

          </p>

        </div>

        <button
          type="button"
          onClick={
            handleExport
          }
          disabled={
            selectedEntries
              .length === 0
          }
          className="shrink-0 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
        >

          ↓ {text.export}

        </button>

      </div>

    </section>
  );
}

export default AdminTimeExport;
