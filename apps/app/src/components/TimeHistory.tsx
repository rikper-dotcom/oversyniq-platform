import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  TimeEntry,
} from "../services/timeService";

type Language =
  | "sv"
  | "en"
  | "pl";

type TimeHistoryProps = {
  entries: TimeEntry[];
  language: Language;
  loading: boolean;
};

type MonthGroup = {
  key: string;
  date: Date;
  entries: TimeEntry[];
  totalMinutes: number;
};

const MONTHS_PER_PAGE = 5;

function TimeHistory({
  entries,
  language,
  loading,
}: TimeHistoryProps) {
  const text = {
    sv: {
      title:
        "Tidigare arbetspass",

      loading:
        "Laddar historik...",

      empty:
        "Inga avslutade arbetspass ännu.",

      total:
        "Totalt",

      manual:
        "Efterregistrerad",

      previous:
        "Nyare",

      next:
        "Äldre",

      page:
        "Sida",

      of:
        "av",

      shifts:
        "arbetspass",

      show:
        "Visa arbetspass",

      hide:
        "Dölj arbetspass",
    },

    en: {
      title:
        "Previous work shifts",

      loading:
        "Loading history...",

      empty:
        "No completed work shifts yet.",

      total:
        "Total",

      manual:
        "Added manually",

      previous:
        "Newer",

      next:
        "Older",

      page:
        "Page",

      of:
        "of",

      shifts:
        "work shifts",

      show:
        "Show work shifts",

      hide:
        "Hide work shifts",
    },

    pl: {
      title:
        "Poprzednie zmiany",

      loading:
        "Ładowanie historii...",

      empty:
        "Brak zakończonych zmian.",

      total:
        "Łącznie",

      manual:
        "Dodano ręcznie",

      previous:
        "Nowsze",

      next:
        "Starsze",

      page:
        "Strona",

      of:
        "z",

      shifts:
        "zmian",

      show:
        "Pokaż zmiany",

      hide:
        "Ukryj zmiany",
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
    const value =
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
      value.charAt(
        0
      ).toUpperCase() +
      value.slice(
        1
      )
    );
  }

  function formatDate(
    value: string
  ) {
    const date =
      new Date(
        value
      );

    const formatted =
      date.toLocaleDateString(
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

  function goToPage(
    page: number
  ) {
    setCurrentPage(
      page
    );

    window.setTimeout(
      () => {
        document
          .getElementById(
            "time-history"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });
      },
      0
    );
  }

  return (
    <section
      id="time-history"
      className="mt-8 scroll-mt-4"
    >

      <h2 className="mb-4 text-xl font-bold">

        📋 {text.title}

      </h2>

      {loading ? (

        <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">

          {text.loading}

        </div>

      ) : (
        monthGroups
          .length === 0
      ) ? (

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-500">

          {text.empty}

        </div>

      ) : (

        <>

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
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
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

                        <h3 className="text-lg font-bold">

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
                            text.shifts
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

                            {
                              text.total
                            }

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
                          className="text-xl text-gray-500"
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
                                          text.manual
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

          </div>

          {totalPages > 1 && (

            <div className="mt-6">

              <p className="mb-3 text-center text-sm text-gray-500">

                {text.page}{" "}

                {
                  currentPage +
                  1
                }{" "}

                {text.of}{" "}

                {
                  totalPages
                }

              </p>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    goToPage(
                      currentPage -
                      1
                    )
                  }
                  disabled={
                    currentPage ===
                    0
                  }
                  className="rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  ← {
                    text.previous
                  }

                </button>

                <button
                  type="button"
                  onClick={() =>
                    goToPage(
                      currentPage +
                      1
                    )
                  }
                  disabled={
                    currentPage >=
                    totalPages -
                    1
                  }
                  className="rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {
                    text.next
                  } →

                </button>

              </div>

            </div>

          )}

        </>

      )}

    </section>
  );
}

export default TimeHistory;