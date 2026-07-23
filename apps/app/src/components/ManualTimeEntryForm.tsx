import {
  useMemo,
  useState,
} from "react";

import {
  createManualTimeEntry,
  type TimeEntry,
} from "../services/timeService";

type Language =
  | "sv"
  | "en"
  | "pl";

type ManualTimeEntryFormProps = {
  staffId: string;
  language: Language;

  onEntryCreated: (
    entry: TimeEntry
  ) => void;
};

function ManualTimeEntryForm({
  staffId,
  language,
  onEntryCreated,
}: ManualTimeEntryFormProps) {
  const text = {
    sv: {
      title:
        "Efterregistrera arbetstid",

      description:
        "Använd formuläret om du har glömt att starta eller avsluta ett arbetspass.",

      showForm:
        "Efterregistrera arbetstid",

      hideForm:
        "Stäng formuläret",

      date:
        "Datum",

      startTime:
        "Starttid",

      endTime:
        "Sluttid",

      comment:
        "Kommentar",

      commentPlaceholder:
        "Beskriv gärna varför tiden efterregistreras...",

      calculatedTime:
        "Beräknad arbetstid",

      save:
        "Spara arbetspass",

      saving:
        "Sparar...",

      success:
        "Arbetspasset har registrerats.",

      required:
        "Fyll i datum, starttid och sluttid.",

      invalidTime:
        "Sluttiden måste vara senare än starttiden.",

      futureDate:
        "Du kan inte registrera arbetstid i framtiden.",

      saveError:
        "Arbetspasset kunde inte sparas. Försök igen.",

      manualInformation:
        "Registreringen märks som efterregistrerad.",
    },

    en: {
      title:
        "Add work time manually",

      description:
        "Use this form if you forgot to start or end a work shift.",

      showForm:
        "Add work time manually",

      hideForm:
        "Close form",

      date:
        "Date",

      startTime:
        "Start time",

      endTime:
        "End time",

      comment:
        "Comment",

      commentPlaceholder:
        "Please describe why the work time is being added manually...",

      calculatedTime:
        "Calculated work time",

      save:
        "Save work shift",

      saving:
        "Saving...",

      success:
        "The work shift has been registered.",

      required:
        "Enter a date, start time and end time.",

      invalidTime:
        "The end time must be later than the start time.",

      futureDate:
        "You cannot register work time in the future.",

      saveError:
        "The work shift could not be saved. Please try again.",

      manualInformation:
        "The entry will be marked as added manually.",
    },

    pl: {
      title:
        "Dodaj czas pracy ręcznie",

      description:
        "Użyj formularza, jeśli zapomniałeś rozpocząć lub zakończyć zmianę.",

      showForm:
        "Dodaj czas pracy ręcznie",

      hideForm:
        "Zamknij formularz",

      date:
        "Data",

      startTime:
        "Godzina rozpoczęcia",

      endTime:
        "Godzina zakończenia",

      comment:
        "Komentarz",

      commentPlaceholder:
        "Opisz, dlaczego czas pracy jest dodawany ręcznie...",

      calculatedTime:
        "Obliczony czas pracy",

      save:
        "Zapisz zmianę",

      saving:
        "Zapisywanie...",

      success:
        "Zmiana została zarejestrowana.",

      required:
        "Wprowadź datę oraz godzinę rozpoczęcia i zakończenia.",

      invalidTime:
        "Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.",

      futureDate:
        "Nie można rejestrować czasu pracy w przyszłości.",

      saveError:
        "Nie udało się zapisać zmiany. Spróbuj ponownie.",

      manualInformation:
        "Wpis zostanie oznaczony jako dodany ręcznie.",
    },
  }[language];

  const today =
    new Date()
      .toLocaleDateString(
        "sv-SE"
      );

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    date,
    setDate,
  ] = useState(
    today
  );

  const [
    startTime,
    setStartTime,
  ] = useState("");

  const [
    endTime,
    setEndTime,
  ] = useState("");

  const [
    comment,
    setComment,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const durationMinutes =
    useMemo(
      () => {
        if (
          !date ||
          !startTime ||
          !endTime
        ) {
          return null;
        }

        const start =
          new Date(
            `${date}T${startTime}`
          );

        const end =
          new Date(
            `${date}T${endTime}`
          );

        if (
          Number.isNaN(
            start.getTime()
          ) ||
          Number.isNaN(
            end.getTime()
          ) ||
          end.getTime() <=
          start.getTime()
        ) {
          return null;
        }

        return Math.round(
          (
            end.getTime() -
            start.getTime()
          ) /
          60000
        );
      },
      [
        date,
        startTime,
        endTime,
      ]
    );

  function formatDuration(
    minutes: number
  ) {
    const hours =
      Math.floor(
        minutes /
        60
      );

    const remainingMinutes =
      minutes %
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

  function resetForm() {
    setDate(
      today
    );

    setStartTime(
      ""
    );

    setEndTime(
      ""
    );

    setComment(
      ""
    );
  }

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(
      ""
    );

    setSuccess(
      ""
    );

    if (
      !date ||
      !startTime ||
      !endTime
    ) {
      setError(
        text.required
      );

      return;
    }

    const start =
      new Date(
        `${date}T${startTime}`
      );

    const end =
      new Date(
        `${date}T${endTime}`
      );

    if (
      end.getTime() <=
      start.getTime()
    ) {
      setError(
        text.invalidTime
      );

      return;
    }

    if (
      end.getTime() >
      Date.now()
    ) {
      setError(
        text.futureDate
      );

      return;
    }

    setSaving(
      true
    );

    try {
      const entry =
        await createManualTimeEntry({
          staffId,
          date,
          startTime,
          endTime,
          comment,
        });

      onEntryCreated(
        entry
      );

      resetForm();

      setSuccess(
        text.success
      );
    } catch (
      saveError
    ) {
      console.error(
        "Failed to create manual time entry:",
        saveError
      );

      setError(
        text.saveError
      );
    } finally {
      setSaving(
        false
      );
    }
  }

  return (
    <section className="mt-8">

      {!isOpen ? (

        <button
          type="button"
          onClick={() => {
            setIsOpen(
              true
            );

            setError(
              ""
            );

            setSuccess(
              ""
            );
          }}
          className="w-full rounded-xl border-2 border-green-600 bg-white p-4 font-semibold text-green-700 transition hover:bg-green-50"
        >

          ＋ {text.showForm}

        </button>

      ) : (

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h2 className="text-xl font-bold">

                📝 {text.title}

              </h2>

              <p className="mt-2 text-sm text-gray-500">

                {
                  text.description
                }

              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(
                  false
                );

                setError(
                  ""
                );

                setSuccess(
                  ""
                );
              }}
              aria-label={
                text.hideForm
              }
              className="rounded-lg bg-gray-200 px-3 py-2 font-bold transition hover:bg-gray-300"
            >

              ✕

            </button>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-6 space-y-5"
          >

            <div>

              <label
                htmlFor="manual-date"
                className="mb-2 block font-medium"
              >

                {text.date}

              </label>

              <input
                id="manual-date"
                type="date"
                value={
                  date
                }
                max={
                  today
                }
                onChange={(
                  event
                ) =>
                  setDate(
                    event
                      .target
                      .value
                  )
                }
                required
                className="w-full rounded-xl border border-gray-300 bg-white p-3"
              />

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div>

                <label
                  htmlFor="manual-start-time"
                  className="mb-2 block font-medium"
                >

                  {
                    text.startTime
                  }

                </label>

                <input
                  id="manual-start-time"
                  type="time"
                  value={
                    startTime
                  }
                  onChange={(
                    event
                  ) =>
                    setStartTime(
                      event
                        .target
                        .value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white p-3"
                />

              </div>

              <div>

                <label
                  htmlFor="manual-end-time"
                  className="mb-2 block font-medium"
                >

                  {
                    text.endTime
                  }

                </label>

                <input
                  id="manual-end-time"
                  type="time"
                  value={
                    endTime
                  }
                  onChange={(
                    event
                  ) =>
                    setEndTime(
                      event
                        .target
                        .value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white p-3"
                />

              </div>

            </div>

            {durationMinutes !==
              null && (

              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">

                <p className="text-sm text-gray-600">

                  {
                    text
                      .calculatedTime
                  }

                </p>

                <p className="mt-1 text-2xl font-bold text-green-800">

                  {
                    formatDuration(
                      durationMinutes
                    )
                  }

                </p>

              </div>

            )}

            <div>

              <label
                htmlFor="manual-comment"
                className="mb-2 block font-medium"
              >

                {text.comment}

              </label>

              <textarea
                id="manual-comment"
                rows={3}
                value={
                  comment
                }
                onChange={(
                  event
                ) =>
                  setComment(
                    event
                      .target
                      .value
                  )
                }
                placeholder={
                  text
                    .commentPlaceholder
                }
                className="w-full rounded-xl border border-gray-300 bg-white p-3"
              />

            </div>

            <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">

              ℹ️ {
                text
                  .manualInformation
              }

            </p>

            {error && (

              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >

                {error}

              </div>

            )}

            {success && (

              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >

                ✅ {success}

              </div>

            )}

            <button
              type="submit"
              disabled={
                saving
              }
              className="w-full rounded-xl bg-green-600 p-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {
                saving
                  ? text.saving
                  : `✓ ${text.save}`
              }

            </button>

          </form>

        </div>

      )}

    </section>
  );
}

export default ManualTimeEntryForm;
