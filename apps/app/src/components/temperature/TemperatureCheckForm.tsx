import {
  useEffect,
  useMemo,
  useState,
} from "react";

import pb from "../../services/pocketbase";

import {
  createTemperatureReading,
  getActiveTemperatureUnits,
  getTemperatureStatus,
  type TemperatureUnit,
} from "../../services/temperatureService";

import TemperatureUnitCard from "./TemperatureUnitCard";

type Language =
  | "sv"
  | "en"
  | "pl";

type TemperatureCheckFormProps = {
  language: Language;
};

type TemperatureFormValue = {
  temperature: string;
  comment: string;
};

type TemperatureFormValues = Record<
  string,
  TemperatureFormValue
>;

function TemperatureCheckForm({
  language,
}: TemperatureCheckFormProps) {
  const [
    units,
    setUnits,
  ] = useState<
    TemperatureUnit[]
  >([]);

  const [
    values,
    setValues,
  ] = useState<
    TemperatureFormValues
  >({});

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    saving,
    setSaving,
  ] = useState(
    false
  );

  const [
    error,
    setError,
  ] = useState(
    ""
  );

  const [
    success,
    setSuccess,
  ] = useState(
    false
  );

  const text = {
    sv: {
      loading:
        "Laddar kylar och frysar...",

      loadError:
        "Kylar och frysar kunde inte hämtas. Försök igen.",

      title:
        "Temperaturkontroll",

      description:
        "Registrera aktuell temperatur för alla kylar och frysar.",

      progress:
        "Registrerade",

      of:
        "av",

      complete:
        "Alla temperaturer är ifyllda.",

      incomplete:
        "Fyll i temperaturen för alla enheter innan kontrollen sparas.",

      missingComments:
        "Skriv en kommentar för alla temperaturavvikelser innan kontrollen sparas.",

      invalidTemperature:
        "En eller flera temperaturer är ogiltiga. Kontrollera de ifyllda värdena.",

      noUser:
        "Du måste vara inloggad för att spara temperaturkontrollen.",

      saveError:
        "Temperaturkontrollen kunde inte sparas. Försök igen.",

      saving:
        "Sparar temperaturkontroll...",

      save:
        "Spara temperaturkontroll",

      success:
        "Temperaturkontrollen har sparats.",

      newCheck:
        "Registrera ny kontroll",

      noUnits:
        "Inga aktiva kylar eller frysar hittades.",
    },

    en: {
      loading:
        "Loading refrigerators and freezers...",

      loadError:
        "The refrigerators and freezers could not be loaded. Please try again.",

      title:
        "Temperature check",

      description:
        "Record the current temperature for all refrigerators and freezers.",

      progress:
        "Recorded",

      of:
        "of",

      complete:
        "All temperatures have been entered.",

      incomplete:
        "Enter a temperature for every unit before saving the check.",

      missingComments:
        "Add a comment for every temperature deviation before saving the check.",

      invalidTemperature:
        "One or more temperatures are invalid. Check the entered values.",

      noUser:
        "You must be signed in to save the temperature check.",

      saveError:
        "The temperature check could not be saved. Please try again.",

      saving:
        "Saving temperature check...",

      save:
        "Save temperature check",

      success:
        "The temperature check has been saved.",

      newCheck:
        "Register a new check",

      noUnits:
        "No active refrigerators or freezers were found.",
    },

    pl: {
      loading:
        "Ładowanie lodówek i zamrażarek...",

      loadError:
        "Nie udało się pobrać lodówek i zamrażarek. Spróbuj ponownie.",

      title:
        "Kontrola temperatury",

      description:
        "Zarejestruj aktualną temperaturę wszystkich lodówek i zamrażarek.",

      progress:
        "Zarejestrowano",

      of:
        "z",

      complete:
        "Wszystkie temperatury zostały wpisane.",

      incomplete:
        "Wpisz temperaturę dla każdego urządzenia przed zapisaniem kontroli.",

      missingComments:
        "Dodaj komentarz do każdego odchylenia temperatury przed zapisaniem kontroli.",

      invalidTemperature:
        "Co najmniej jedna temperatura jest nieprawidłowa. Sprawdź wpisane wartości.",

      noUser:
        "Musisz być zalogowany, aby zapisać kontrolę temperatury.",

      saveError:
        "Nie udało się zapisać kontroli temperatury. Spróbuj ponownie.",

      saving:
        "Zapisywanie kontroli temperatury...",

      save:
        "Zapisz kontrolę temperatury",

      success:
        "Kontrola temperatury została zapisana.",

      newCheck:
        "Zarejestruj nową kontrolę",

      noUnits:
        "Nie znaleziono aktywnych lodówek ani zamrażarek.",
    },
  }[language];

  useEffect(() => {
    async function loadUnits() {
      try {
        setError(
          ""
        );

        const loadedUnits =
          await getActiveTemperatureUnits();

        setUnits(
          loadedUnits
        );

        const initialValues:
          TemperatureFormValues =
          {};

        loadedUnits.forEach(
          (
            unit
          ) => {
            initialValues[
              unit.id
            ] = {
              temperature:
                "",

              comment:
                "",
            };
          }
        );

        setValues(
          initialValues
        );
      } catch (
        loadError
      ) {
        console.error(
          "Failed to load temperature units:",
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

    loadUnits();
  }, [
    text.loadError,
  ]);

  const completedCount =
    useMemo(
      () =>
        units.filter(
          (
            unit
          ) =>
            values[
              unit.id
            ]?.temperature
              .trim() !==
            ""
        ).length,
      [
        units,
        values,
      ]
    );

  const allCompleted =
    units.length > 0 &&
    completedCount ===
      units.length;

  function parseTemperature(
    value: string
  ) {
    const normalizedValue =
      value
        .trim()
        .replace(
          ",",
          "."
        );

    if (
      normalizedValue ===
      ""
    ) {
      return null;
    }

    const temperature =
      Number(
        normalizedValue
      );

    return Number.isFinite(
      temperature
    )
      ? temperature
      : null;
  }

  function updateTemperature(
    unitId: string,
    temperature: string
  ) {
    setSuccess(
      false
    );

    setError(
      ""
    );

    setValues(
      (
        currentValues
      ) => ({
        ...currentValues,

        [
          unitId
        ]: {
          temperature,

          comment:
            currentValues[
              unitId
            ]?.comment ??
            "",
        },
      })
    );
  }

  function updateComment(
    unitId: string,
    comment: string
  ) {
    setSuccess(
      false
    );

    setError(
      ""
    );

    setValues(
      (
        currentValues
      ) => ({
        ...currentValues,

        [
          unitId
        ]: {
          temperature:
            currentValues[
              unitId
            ]?.temperature ??
            "",

          comment,
        },
      })
    );
  }

  function resetForm() {
    const emptyValues:
      TemperatureFormValues =
      {};

    units.forEach(
      (
        unit
      ) => {
        emptyValues[
          unit.id
        ] = {
          temperature:
            "",

          comment:
            "",
        };
      }
    );

    setValues(
      emptyValues
    );

    setError(
      ""
    );

    setSuccess(
      false
    );

    window.scrollTo({
      top:
        0,

      behavior:
        "smooth",
    });
  }

  async function handleSubmit(
    event:
      React.FormEvent<
        HTMLFormElement
      >
  ) {
    event.preventDefault();

    setError(
      ""
    );

    setSuccess(
      false
    );

    const user =
      pb.authStore.record;

    if (
      !user?.id
    ) {
      setError(
        text.noUser
      );

      return;
    }

    if (
      !allCompleted
    ) {
      setError(
        text.incomplete
      );

      return;
    }

    const preparedReadings =
      units.map(
        (
          unit
        ) => {
          const value =
            values[
              unit.id
            ];

          const temperature =
            parseTemperature(
              value
                .temperature
            );

          return {
            unit,
            temperature,
            comment:
              value.comment
                .trim(),
          };
        }
      );

    const hasInvalidTemperature =
      preparedReadings.some(
        (
          reading
        ) =>
          reading
            .temperature ===
          null
      );

    if (
      hasInvalidTemperature
    ) {
      setError(
        text
          .invalidTemperature
      );

      return;
    }

    const hasMissingComment =
      preparedReadings.some(
        (
          reading
        ) => {
          if (
            reading
              .temperature ===
            null
          ) {
            return false;
          }

          const status =
            getTemperatureStatus(
              reading.unit,
              reading
                .temperature
            );

          return (
            status ===
              "deviation" &&
            reading
              .comment ===
              ""
          );
        }
      );

    if (
      hasMissingComment
    ) {
      setError(
        text
          .missingComments
      );

      return;
    }

    setSaving(
      true
    );

    try {
      for (
        const reading
        of preparedReadings
      ) {
        if (
          reading
            .temperature ===
          null
        ) {
          continue;
        }

        await createTemperatureReading({
          unit:
            reading.unit,

          staffId:
            user.id,

          temperature:
            reading
              .temperature,

          comment:
            reading
              .comment,
        });
      }

      setSuccess(
        true
      );

      window.scrollTo({
        top:
          0,

        behavior:
          "smooth",
      });
    } catch (
      saveError
    ) {
      console.error(
        "Failed to save temperature check:",
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
    units.length === 0
  ) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">

        <p className="text-gray-500">

          {error ||
            text.noUnits}

        </p>

      </div>
    );
  }

  if (
    success
  ) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center shadow">

        <div className="text-6xl">

          ✅

        </div>

        <h2 className="mt-5 text-2xl font-bold text-green-900">

          {text.success}

        </h2>

        <button
          type="button"
          onClick={
            resetForm
          }
          className="mt-7 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >

          ↻ {text.newCheck}

        </button>

      </div>
    );
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >

      <section className="mb-6 rounded-2xl bg-white p-5 shadow">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              {text.title}

            </h2>

            <p className="mt-2 text-gray-500">

              {
                text.description
              }

            </p>

          </div>

          <div
            className={
              allCompleted
                ? "rounded-xl bg-green-100 px-5 py-3 text-center text-green-800"
                : "rounded-xl bg-gray-100 px-5 py-3 text-center text-gray-700"
            }
          >

            <p className="text-sm font-medium">

              {text.progress}

            </p>

            <p className="mt-1 text-xl font-bold">

              {completedCount}
              {" "}
              {text.of}
              {" "}
              {units.length}

            </p>

          </div>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-green-600 transition-all duration-300"
            style={{
              width:
                `${
                  (
                    completedCount /
                    units.length
                  ) *
                  100
                }%`,
            }}
          />

        </div>

        <p
          className={
            allCompleted
              ? "mt-3 text-sm font-medium text-green-700"
              : "mt-3 text-sm text-gray-500"
          }
        >

          {allCompleted
            ? text.complete
            : text.incomplete}

        </p>

      </section>

      {error && (

        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-700"
        >

          {error}

        </div>

      )}

      <div className="grid gap-5 lg:grid-cols-2">

        {units.map(
          (
            unit
          ) => (

            <TemperatureUnitCard
              key={
                unit.id
              }
              unit={
                unit
              }
              temperature={
                values[
                  unit.id
                ]?.temperature ??
                ""
              }
              comment={
                values[
                  unit.id
                ]?.comment ??
                ""
              }
              language={
                language
              }
              disabled={
                saving
              }
              onTemperatureChange={(
                value
              ) =>
                updateTemperature(
                  unit.id,
                  value
                )
              }
              onCommentChange={(
                value
              ) =>
                updateComment(
                  unit.id,
                  value
                )
              }
            />

          )
        )}

      </div>

      <div className="sticky bottom-4 mt-8 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur">

        <button
          type="submit"
          disabled={
            saving ||
            !allCompleted
          }
          className="w-full rounded-xl bg-green-600 p-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
        >

          {saving
            ? text.saving
            : `✓ ${text.save}`}

        </button>

      </div>

    </form>
  );
}

export default TemperatureCheckForm;
