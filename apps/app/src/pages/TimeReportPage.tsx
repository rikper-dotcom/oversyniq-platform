import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

import TimeHistory from "../components/TimeHistory";
import ManualTimeEntryForm from "../components/ManualTimeEntryForm";

import pb from "../services/pocketbase";

import {
  getActiveTimeEntry,
  getCompletedTimeEntries,
  startTimeEntry,
  stopTimeEntry,
  type TimeEntry,
} from "../services/timeService";

import {
  useLanguage,
} from "../context/LanguageContext";

function TimeReportPage() {
  const navigate = useNavigate();

  const {
    language,
  } = useLanguage();

  const user =
    pb.authStore.record;

  const [
    activeEntry,
    setActiveEntry,
  ] = useState<
    TimeEntry | null
  >(null);

  const [
    completedEntries,
    setCompletedEntries,
  ] = useState<
    TimeEntry[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    historyLoading,
    setHistoryLoading,
  ] = useState(true);

  const [
    working,
    setWorking,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    now,
    setNow,
  ] = useState(
    new Date()
  );

  const text = {
    sv: {
      title:
        "Min tidsrapportering",

      welcome:
        "Inloggad som",

      loading:
        "Laddar tidsrapportering...",

      notWorking:
        "Inget arbetspass pågår",

      notWorkingDescription:
        "Tryck på knappen när du börjar arbeta.",

      start:
        "Starta arbetspass",

      starting:
        "Startar...",

      working:
        "Arbetspass pågår",

      started:
        "Startade",

      worked:
        "Arbetad tid",

      stop:
        "Avsluta arbetspass",

      stopping:
        "Avslutar...",

      back:
        "Tillbaka",

      error:
        "Något gick fel. Försök igen.",
    },

    en: {
      title:
        "My time reporting",

      welcome:
        "Signed in as",

      loading:
        "Loading time reporting...",

      notWorking:
        "No work shift is active",

      notWorkingDescription:
        "Press the button when you start working.",

      start:
        "Start work shift",

      starting:
        "Starting...",

      working:
        "Work shift in progress",

      started:
        "Started",

      worked:
        "Time worked",

      stop:
        "End work shift",

      stopping:
        "Ending...",

      back:
        "Back",

      error:
        "Something went wrong. Please try again.",
    },

    pl: {
      title:
        "Moja ewidencja czasu",

      welcome:
        "Zalogowano jako",

      loading:
        "Ładowanie ewidencji czasu...",

      notWorking:
        "Brak aktywnej zmiany",

      notWorkingDescription:
        "Naciśnij przycisk, gdy rozpoczniesz pracę.",

      start:
        "Rozpocznij zmianę",

      starting:
        "Rozpoczynanie...",

      working:
        "Zmiana jest aktywna",

      started:
        "Rozpoczęto",

      worked:
        "Czas pracy",

      stop:
        "Zakończ zmianę",

      stopping:
        "Kończenie...",

      back:
        "Wstecz",

      error:
        "Wystąpił błąd. Spróbuj ponownie.",
    },
  }[language];

  useEffect(() => {
    async function load() {
      if (!user?.id) {
        setLoading(false);
        setHistoryLoading(false);

        return;
      }

      try {
        const [
          active,
          completed,
        ] =
          await Promise.all([
            getActiveTimeEntry(
              user.id
            ),

            getCompletedTimeEntries(
              user.id
            ),
          ]);

        setActiveEntry(
          active
        );

        setCompletedEntries(
          completed
        );
      } catch (loadError) {
        console.error(
          "Failed to load time entries:",
          loadError
        );

        setError(
          text.error
        );
      } finally {
        setLoading(false);
        setHistoryLoading(false);
      }
    }

    load();
  }, [
    user?.id,
    text.error,
  ]);

  useEffect(() => {
    if (!activeEntry) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          setNow(
            new Date()
          );
        },
        1000
      );

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [
    activeEntry,
  ]);

  async function handleStart() {
    if (!user?.id) {
      return;
    }

    setError("");
    setWorking(true);

    try {
      const entry =
        await startTimeEntry(
          user.id
        );

      setActiveEntry(
        entry
      );

      setNow(
        new Date()
      );
    } catch (startError) {
      console.error(
        "Failed to start time entry:",
        startError
      );

      setError(
        text.error
      );
    } finally {
      setWorking(false);
    }
  }

  async function handleStop() {
    if (!activeEntry) {
      return;
    }

    setError("");
    setWorking(true);

    try {
      const completedEntry =
        await stopTimeEntry(
          activeEntry
        );

      setCompletedEntries(
        (
          currentEntries
        ) => [
            completedEntry,
            ...currentEntries,
          ]
      );

      setActiveEntry(
        null
      );
    } catch (stopError) {
      console.error(
        "Failed to stop time entry:",
        stopError
      );

      setError(
        text.error
      );
    } finally {
      setWorking(false);
    }
  }

  function formatElapsedTime() {
    if (!activeEntry) {
      return "00:00:00";
    }

    const start =
      new Date(
        activeEntry.startTime
      );

    const totalSeconds =
      Math.max(
        0,
        Math.floor(
          (
            now.getTime() -
            start.getTime()
          ) /
          1000
        )
      );

    const hours =
      Math.floor(
        totalSeconds /
        3600
      );

    const minutes =
      Math.floor(
        (
          totalSeconds %
          3600
        ) /
        60
      );

    const seconds =
      totalSeconds %
      60;

    return [
      hours,
      minutes,
      seconds,
    ]
      .map((value) =>
        String(
          value
        ).padStart(
          2,
          "0"
        )
      )
      .join(":");
  }

  const locale =
    language === "sv"
      ? "sv-SE"
      : language === "pl"
        ? "pl-PL"
        : "en-GB";

  const displayName =
    user?.name ||
    user?.email ||
    "";

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-xl">

        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <div className="mb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl bg-gray-200 px-4 py-2 font-medium transition hover:bg-gray-300"
            >
              ← {text.back}
            </button>
          </div>

          <div className="mb-6 flex justify-center">

            <img
              src={logo}
              alt="24 Sju"
              className="h-20 w-20 object-contain"
            />

          </div>

          <h1 className="text-center text-3xl font-bold">

            {text.title}

          </h1>

          <p className="mb-8 text-center text-gray-500">

            {text.welcome}{" "}
            {displayName}

          </p>

          {loading ? (

            <div className="rounded-2xl bg-gray-50 p-8 text-center">

              {text.loading}

            </div>

          ) : activeEntry ? (

            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">

              <div className="mb-3 text-5xl">

                🟢

              </div>

              <h2 className="text-2xl font-bold text-green-800">

                {text.working}

              </h2>

              <p className="mt-3 text-gray-600">

                {text.started}:{" "}

                {new Date(
                  activeEntry.startTime
                ).toLocaleString(
                  locale
                )}

              </p>

              <p className="mt-6 text-sm font-medium uppercase tracking-wide text-gray-500">

                {text.worked}

              </p>

              <p className="mt-1 font-mono text-5xl font-bold">

                {
                  formatElapsedTime()
                }

              </p>

              <button
                type="button"
                onClick={
                  handleStop
                }
                disabled={
                  working
                }
                className="mt-8 w-full rounded-xl bg-red-600 p-4 text-lg font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {working
                  ? text.stopping
                  : `■ ${text.stop}`}

              </button>

            </div>

          ) : (

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">

              <div className="mb-3 text-5xl">

                ⏱️

              </div>

              <h2 className="text-2xl font-bold">

                {
                  text.notWorking
                }

              </h2>

              <p className="mt-3 text-gray-500">

                {
                  text
                    .notWorkingDescription
                }

              </p>

              <button
                type="button"
                onClick={
                  handleStart
                }
                disabled={
                  working
                }
                className="mt-8 w-full rounded-xl bg-green-600 p-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {working
                  ? text.starting
                  : `▶ ${text.start}`}

              </button>

            </div>

          )}

          {error && (

            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700"
            >

              {error}

            </div>

          )}
          {user?.id && (

            <ManualTimeEntryForm
              staffId={
                user.id
              }
              language={
                language
              }
              onEntryCreated={(
                entry
              ) => {
                setCompletedEntries(
                  (
                    currentEntries
                  ) =>
                    [
                      entry,
                      ...currentEntries,
                    ].sort(
                      (
                        first,
                        second
                      ) =>
                        new Date(
                          second.startTime
                        ).getTime() -
                        new Date(
                          first.startTime
                        ).getTime()
                    )
                );
              }}
            />

          )}
          <TimeHistory
            entries={
              completedEntries
            }
            language={
              language
            }
            loading={
              historyLoading
            }
          />


        </div>

      </div>

    </div>
  );
}

export default TimeReportPage;