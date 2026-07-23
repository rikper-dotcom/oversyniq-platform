import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  TimeEntry,
} from "../../services/timeService";

type Language =
  | "sv"
  | "en"
  | "pl";

type AdminStaffTimeHistoryProps = {
  entries: TimeEntry[];
  language: Language;
};

type MonthGroup = {
  key: string;
  date: Date;
  entries: TimeEntry[];
  totalMinutes: number;
};

const MONTHS_PER_PAGE = 5;

function AdminStaffTimeHistory({
  entries,
  language,
}: AdminStaffTimeHistoryProps) {
  const text = {
    sv: {
      noShifts:
        "Inga avslutade arbetspass ännu.",

      total:
        "Totalt",

      workShifts:
        "arbetspass",

      manual:
        "Efterregistrerad",

      show:
        "Visa arbetspass",

      hide:
        "Dölj arbetspass",

      newer:
        "Nyare",

      older:
        "Äldre",

      page:
        "Sida",

      of:
        "av",
    },

    en: {
      noShifts:
        "No completed work shifts yet.",

      total:
        "Total",

      workShifts:
        "work shifts",

      manual:
        "Added manually",

      show:
        "Show work shifts",

      hide:
        "Hide work shifts",

      newer:
        "Newer",

      older:
        "Older",

      page:
        "Page",

      of:
        "of",
    },

    pl: {
      noShifts:
        "Brak zakończonych zmian.",

      total:
        "Łącznie",

      workShifts:
        "zmian",

      manual:
        "Dodano ręcznie",

      show:
        "Pokaż zmiany",

      hide:
        "Ukryj zmiany",

      newer:
        "Nowsze",

      older:
        "Starsze",

      page:
        "Strona",

      of:
        "z",
    },
  }[language];

  const locale =
    language === "sv"
      ? "sv-SE"
      : language === "pl"
        ? "pl-PL"
        : "en-GB";

  const [
    currentPage,
    setCurrentPage,
  ] = useState(0);

  const [
    openMonth,
    setOpenMonth,
  ] = useState<
    string | null
  >(null);

  const monthGroups =
    useMemo<
      MonthGroup[]
    >(() => {
      const groups =
        new Map<
          string,
          TimeEntry[]
        >();

      entries.forEach(
        (
          entry
        ) => {
          const date =
            new Date(
              entry.startTime
            );

          const key =
            [
              date.getFullYear(),

              String(
                date.getMonth() +
                1
              ).padStart(
                2,
                "0"
              ),
            ].join("-");

          const existing =
            groups.get(
              key
            ) || [];

          existing.push(
            entry
          );

          groups.set(
            key,
            existing
          );
        }
      );

      return Array.from(
        groups.entries()
      )
        .map(
          ([
            key,
            monthEntries,
          ]) => {
            const [
              year,
              month,
            ] =
              key
                .split("-")
                .map(
                  Number
                );

            const sortedEntries =
              [
                ...monthEntries,
              ].sort(
                (
                  first,
                  second
                ) =>
                  new Date(
                    second
                      .startTime
                  ).getTime() -
                  new Date(
                    first
                      .startTime
                  ).getTime()
              );

            const totalMinutes =
              sortedEntries.reduce(
                (
                  total,
                  entry
                ) =>
                  total +
                  (
                    entry
                      .durationMinutes ||
                    0
                  ),
                0
              );

            return {
              key,

              date:
                new Date(
                  year,
                  month - 1,
                  1
                ),

              entries:
                sortedEntries,

              totalMinutes,
            };
          }
        )
        .sort(
          (
            first,
            second
          ) =>
            second
              .date
              .getTime() -
            first
              .date
              .getTime()
        );
    }, [
      entries,
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        monthGroups.length /
        MONTHS_PER_PAGE
      )
    );

  const visibleMonths =
    monthGroups.slice(
      currentPage *
        MONTHS_PER_PAGE,

      (
        currentPage + 1
      ) *
        MONTHS_PER_PAGE
    );

  useEffect(() => {
    if (
      currentPage >
      totalPages - 1
    ) {
      setCurrentPage(
        Math.max(
          0,
          totalPages - 1
        )
      );
    }
  }, [
    currentPage,
    totalPages,
  ]);

  useEffect(() => {
    setOpenMonth(
      visibleMonths[0]
        ?.key ||
      null
    );
  }, [
    currentPage,
    monthGroups.length,
  ]);

  function formatDuration(
    minutes: number
  ) {
    const safeMinutes =
      Math.max(
        0,
        minutes || 0
      );

    const hours =
      Math.floor(
        safeMinutes /
        60
      );

    const remainingMinutes =
      safeMinutes %
      60;

    if (
      hours === 0
    ) {
      return (
        `${remainingMinutes} min`
      );
    }

    return (
      `${hours} h ` +
      `${remainingMinutes} min`
    );
  }

  function formatMonth(
    date: Date
  ) {
    const formatted =
      date.toLocaleDateString(
        locale,
        {
          month:
            "long",

          year:
            "numeric",
        }
      );

    return (
      formatted.charAt(
        0
      ).toUpperCase() +
      formatted.slice(
        1
      )
    );
  }

  function formatDate(
    value: string
  ) {
    const formatted =
      new Date(
        value
      ).toLocaleDateString(
        locale,
        {
          weekday:
            "short",

          day:
            "numeric",

          month:
            "long",
        }
      );

    return (
      formatted.charAt(
        0
      ).toUpperCase() +
      formatted.slice(
        1
      )
    );
  }

  function formatTime(
    value: string
  ) {
    return new Date(
      value
    ).toLocaleTimeString(
      locale,
      {
        hour:
          "2-digit",

        minute:
          "2-digit",
      }
    );
  }

  function toggleMonth(
    key: string
  ) {
    setOpenMonth(
      (
        current
      ) =>
        current === key
          ? null
          : key
    );
  }

  if (
    monthGroups.length ===
    0
  ) {
    return (
      <div className="rounded-xl bg-white p-5 text-center text-gray-500">

        {text.noShifts}

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {visibleMonths.map(
        (
          month
        ) => {
          const isOpen =
            openMonth ===
            month.key;

          return (

            <article
              key={
                month.key
              }
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >

              <button
                type="button"
                onClick={() =>
                  toggleMonth(
                    month.key
                  )
                }
                aria-expanded={
                  isOpen
                }
                className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-gray-50"
              >

                <div>

                  <h3 className="font-bold">

                    {
                      formatMonth(
                        month.date
                      )
                    }

                  </h3>

                  <p className="mt-1 text-sm text-gray-500">

                    {
                      month
                        .entries
                        .length
                    }{" "}

                    {
                      text
                        .workShifts
                    }

                    {" · "}

                    {
                      isOpen
                        ? text.hide
                        : text.show
                    }

                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <div className="text-right">

                    <p className="text-xs uppercase tracking-wide text-gray-500">

                      {text.total}

                    </p>

                    <p className="whitespace-nowrap font-bold">

                      {
                        formatDuration(
                          month
                            .totalMinutes
                        )
                      }

                    </p>

                  </div>

                  <span
                    className="text-lg text-gray-500"
                    aria-hidden="true"
                  >

                    {
                      isOpen
                        ? "▲"
                        : "▼"
                    }

                  </span>

                </div>

              </button>

              {isOpen && (

                <div className="space-y-3 border-t border-gray-200 bg-gray-50 p-3">

                  {month
                    .entries
                    .map(
                      (
                        entry
                      ) => (

                        <div
                          key={
                            entry.id
                          }
                          className="rounded-xl bg-white p-4 shadow-sm"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <p className="font-semibold">

                                {
                                  formatDate(
                                    entry
                                      .startTime
                                  )
                                }

                              </p>

                              <p className="mt-1 text-sm text-gray-500">

                                {
                                  formatTime(
                                    entry
                                      .startTime
                                  )
                                }

                                {" – "}

                                {
                                  formatTime(
                                    entry
                                      .endTime
                                  )
                                }

                              </p>

                              {entry
                                .manualEntry && (

                                <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">

                                  {
                                    text
                                      .manual
                                  }

                                </span>

                              )}

                            </div>

                            <p className="whitespace-nowrap font-bold">

                              {
                                formatDuration(
                                  entry
                                    .durationMinutes
                                )
                              }

                            </p>

                          </div>

                          {entry
                            .comment && (

                            <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-600">

                              {
                                entry
                                  .comment
                              }

                            </p>

                          )}

                        </div>

                      )
                    )}

                </div>

              )}

            </article>

          );
        }
      )}

      {totalPages > 1 && (

        <div className="pt-2">

          <p className="mb-3 text-center text-sm text-gray-500">

            {text.page}{" "}

            {
              currentPage +
              1
            }{" "}

            {text.of}{" "}

            {totalPages}

          </p>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() =>
                setCurrentPage(
                  (
                    current
                  ) =>
                    Math.max(
                      0,
                      current - 1
                    )
                )
              }
              disabled={
                currentPage ===
                0
              }
              className="rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            >

              ← {text.newer}

            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentPage(
                  (
                    current
                  ) =>
                    Math.min(
                      totalPages -
                      1,
                      current + 1
                    )
                )
              }
              disabled={
                currentPage >=
                totalPages - 1
              }
              className="rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            >

              {text.older} →

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminStaffTimeHistory;
