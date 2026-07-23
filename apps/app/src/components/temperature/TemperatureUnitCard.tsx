import {
  useMemo,
} from "react";

import type {
  TemperatureUnit,
} from "../../services/temperatureService";

type Language =
  | "sv"
  | "en"
  | "pl";

type TemperatureUnitCardProps = {
  unit: TemperatureUnit;
  temperature: string;
  comment: string;
  language: Language;
  disabled?: boolean;
  onTemperatureChange: (
    value: string
  ) => void;
  onCommentChange: (
    value: string
  ) => void;
};

function TemperatureUnitCard({
  unit,
  temperature,
  comment,
  language,
  disabled = false,
  onTemperatureChange,
  onCommentChange,
}: TemperatureUnitCardProps) {
  const text = {
    sv: {
      fridge:
        "Kyl",

      freezer:
        "Frys",

      approvedRange:
        "Godkänt intervall",

      temperature:
        "Temperatur",

      temperaturePlaceholder:
        "Exempel: 4,5",

      normal:
        "Godkänd temperatur",

      deviation:
        "Temperaturavvikelse",
      deviationMessage:
        "ligger utanför godkänt intervall",

      comment:
        "Kommentar vid avvikelse",

      commentPlaceholder:
        "Beskriv kontroll eller åtgärd...",
    },

    en: {
      fridge:
        "Refrigerator",

      freezer:
        "Freezer",

      approvedRange:
        "Approved range",

      temperature:
        "Temperature",

      temperaturePlaceholder:
        "Example: 4.5",

      normal:
        "Temperature approved",

      deviation:
        "Temperature deviation",
      deviationMessage:
        "is outside the approved range",

      comment:
        "Comment for deviation",

      commentPlaceholder:
        "Describe the check or action taken...",
    },

    pl: {
      fridge:
        "Lodówka",

      freezer:
        "Zamrażarka",

      approvedRange:
        "Dopuszczalny zakres",

      temperature:
        "Temperatura",

      temperaturePlaceholder:
        "Przykład: 4,5",

      normal:
        "Temperatura prawidłowa",

      deviation:
        "Odchylenie temperatury",
      deviationMessage:
        "znajduje się poza dopuszczalnym zakresem",

      comment:
        "Komentarz dotyczący odchylenia",

      commentPlaceholder:
        "Opisz kontrolę lub podjęte działanie...",
    },
  }[language];

  const parsedTemperature =
    useMemo(
      () => {
        const normalizedValue =
          temperature
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

        const value =
          Number(
            normalizedValue
          );

        return Number.isFinite(
          value
        )
          ? value
          : null;
      },
      [
        temperature,
      ]
    );

  const hasTemperature =
    parsedTemperature !==
    null;

  const isWithinRange =
    hasTemperature &&
    parsedTemperature >=
    unit.minTemperature &&
    parsedTemperature <=
    unit.maxTemperature;

  const hasDeviation =
    hasTemperature &&
    !isWithinRange;

  return (
    <article
      className={
        hasDeviation
          ? "rounded-2xl border-2 border-red-300 bg-red-50 p-5 transition"
          : isWithinRange
            ? "rounded-2xl border-2 border-green-300 bg-green-50 p-5 transition"
            : "rounded-2xl border border-gray-200 bg-white p-5 transition"
      }
    >

      <div className="flex flex-wrap items-start justify-between gap-3">

        <div>

          <div className="flex flex-wrap items-center gap-2">

            <span
              className="text-3xl"
              aria-hidden="true"
            >

              {unit.type ===
                "freezer"
                ? "❄️"
                : "🧊"}

            </span>

            <h2 className="text-xl font-bold">

              {unit.name}

            </h2>

          </div>

          <span
            className={
              unit.type ===
                "freezer"
                ? "mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                : "mt-3 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700"
            }
          >

            {unit.type ===
              "freezer"
              ? text.freezer
              : text.fridge}

          </span>

        </div>

        <div className="rounded-xl bg-gray-100 px-4 py-3 text-right">

          <p className="text-xs text-gray-500">

            {text.approvedRange}

          </p>

          <p className="mt-1 font-bold">

            {unit.minTemperature}
            {" °C – "}
            {unit.maxTemperature}
            {" °C"}

          </p>

        </div>

      </div>

      <label className="mt-5 block">

        <span className="mb-2 block text-sm font-semibold">

          {text.temperature}

        </span>

        <div className="relative">

          <input
            type="text"
            inputMode="decimal"
            value={temperature}
            onChange={(event) =>
              onTemperatureChange(event.target.value)
            }
            disabled={disabled}
            placeholder={text.temperaturePlaceholder}
            className={
              hasDeviation
                ? "w-full rounded-xl border-2 border-red-400 bg-red-50 px-4 py-4 pr-14 text-lg font-semibold outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                : isWithinRange
                  ? "w-full rounded-xl border-2 border-green-400 bg-green-50 px-4 py-4 pr-14 text-lg font-semibold outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
                  : "w-full rounded-xl border border-gray-300 bg-white px-4 py-4 pr-14 text-lg font-semibold outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
            }
          />

          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-semibold text-gray-500">

            °C

          </span>

        </div>

      </label>

      {isWithinRange && (

        <div
          role="status"
          className="mt-4 rounded-xl border border-green-200 bg-green-100 p-3 font-semibold text-green-800"
        >

          ✓ {text.normal}

        </div>

      )}

      {hasDeviation && (

        <>

          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-100 p-3 text-red-800"
          >
            <p className="font-bold">
              ⚠ {text.deviation}
            </p>

            <p className="mt-2 text-sm">
              {parsedTemperature} °C {text.deviationMessage} (
              {unit.minTemperature} °C – {unit.maxTemperature} °C)
            </p>
          </div>

          <label className="mt-4 block">

            <span className="mb-2 block text-sm font-semibold text-red-900">

              {text.comment}

            </span>

            <textarea
              value={
                comment
              }
              onChange={(
                event
              ) =>
                onCommentChange(
                  event
                    .target
                    .value
                )
              }
              disabled={
                disabled
              }
              rows={
                3
              }
              placeholder={
                text
                  .commentPlaceholder
              }
              className="w-full resize-y rounded-xl border border-red-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </label>

        </>

      )}

    </article>
  );
}

export default TemperatureUnitCard;
