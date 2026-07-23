import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  TemperatureReading,
  TemperatureUnit,
} from "../../services/temperatureService";

type Language =
  | "sv"
  | "en"
  | "pl";

type TemperatureHistoryChartProps = {
  unit: TemperatureUnit;
  readings: TemperatureReading[];
  language: Language;
};

type ChartDataPoint = {
  id: string;
  dateLabel: string;
  fullDate: string;
  temperature: number;
  status:
    | "normal"
    | "deviation";
  staffName: string;
  comment: string;
};

type TooltipPayload = {
  payload:
    ChartDataPoint;
};

type TemperatureTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
};

function TemperatureHistoryChart({
  unit,
  readings,
  language,
}: TemperatureHistoryChartProps) {
  const text = {
    sv: {
      title:
        "Temperaturutveckling",

      description:
        "Temperatur över tid för vald enhet.",

      temperature:
        "Temperatur",

      approvedRange:
        "Godkänt intervall",

      minimum:
        "Lägsta godkända",

      maximum:
        "Högsta godkända",

      registeredBy:
        "Registrerad av",

      comment:
        "Kommentar",

      noComment:
        "Ingen kommentar",

      noData:
        "Det finns inga temperaturmätningar för vald enhet och period.",

      deviation:
        "Avvikelse",
    },

    en: {
      title:
        "Temperature trend",

      description:
        "Temperature over time for the selected unit.",

      temperature:
        "Temperature",

      approvedRange:
        "Approved range",

      minimum:
        "Minimum approved",

      maximum:
        "Maximum approved",

      registeredBy:
        "Recorded by",

      comment:
        "Comment",

      noComment:
        "No comment",

      noData:
        "There are no temperature readings for the selected unit and period.",

      deviation:
        "Deviation",
    },

    pl: {
      title:
        "Przebieg temperatury",

      description:
        "Temperatura wybranego urządzenia w czasie.",

      temperature:
        "Temperatura",

      approvedRange:
        "Dopuszczalny zakres",

      minimum:
        "Minimalna dopuszczalna",

      maximum:
        "Maksymalna dopuszczalna",

      registeredBy:
        "Zarejestrowano przez",

      comment:
        "Komentarz",

      noComment:
        "Brak komentarza",

      noData:
        "Brak pomiarów temperatury dla wybranego urządzenia i okresu.",

      deviation:
        "Odchylenie",
    },
  }[language];

  const locale =
    language === "sv"
      ? "sv-SE"
      : language === "pl"
        ? "pl-PL"
        : "en-GB";

  const chartData:
    ChartDataPoint[] =
    readings
      .filter(
        (
          reading
        ) =>
          reading.unit ===
          unit.id
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
      )
      .map(
        (
          reading
        ) => {
          const date =
            new Date(
              reading.created
            );

          const staff =
            reading
              .expand
              ?.staff;

          return {
            id:
              reading.id,

            dateLabel:
              date.toLocaleDateString(
                locale,
                {
                  day:
                    "2-digit",

                  month:
                    "short",
                }
              ),

            fullDate:
              date.toLocaleString(
                locale,
                {
                  dateStyle:
                    "medium",

                  timeStyle:
                    "short",
                }
              ),

            temperature:
              reading
                .temperature,

            status:
              reading.status,

            staffName:
              staff?.name ||
              staff?.email ||
              "—",

            comment:
              reading.comment ||
              "",
          };
        }
      );

  const temperatures =
    chartData.map(
      (
        reading
      ) =>
        reading.temperature
    );

  const lowestValue =
    Math.min(
      unit.minTemperature,
      ...temperatures
    );

  const highestValue =
    Math.max(
      unit.maxTemperature,
      ...temperatures
    );

  const padding =
    Math.max(
      2,
      (
        highestValue -
        lowestValue
      ) *
        0.15
    );

  const yAxisMinimum =
    Math.floor(
      lowestValue -
      padding
    );

  const yAxisMaximum =
    Math.ceil(
      highestValue +
      padding
    );

  function CustomTooltip({
    active,
    payload,
  }: TemperatureTooltipProps) {
    if (
      !active ||
      !payload ||
      payload.length ===
        0
    ) {
      return null;
    }

    const reading =
      payload[
        0
      ].payload;

    return (
      <div className="max-w-xs rounded-xl border border-gray-200 bg-white p-4 shadow-xl">

        <p className="font-bold">

          {
            reading
              .fullDate
          }

        </p>

        <p
          className={
            reading.status ===
            "deviation"
              ? "mt-2 text-xl font-bold text-red-600"
              : "mt-2 text-xl font-bold text-green-700"
          }
        >

          {
            reading
              .temperature
          }
          {" °C"}

        </p>

        {reading.status ===
          "deviation" && (

          <p className="mt-1 font-semibold text-red-600">

            ⚠ {
              text
                .deviation
            }

          </p>

        )}

        <div className="mt-3 border-t border-gray-200 pt-3 text-sm">

          <p>

            <span className="font-semibold">

              {
                text
                  .registeredBy
              }:

            </span>
            {" "}
            {
              reading
                .staffName
            }

          </p>

          <p className="mt-2">

            <span className="font-semibold">

              {
                text
                  .comment
              }:

            </span>
            {" "}
            {
              reading
                .comment ||
              text.noComment
            }

          </p>

        </div>

      </div>
    );
  }

  if (
    chartData.length ===
    0
  ) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow">

        <h2 className="text-xl font-bold">

          {
            text.title
          }

        </h2>

        <p className="mt-2 text-gray-500">

          {
            text.noData
          }

        </p>

      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <h2 className="text-xl font-bold">

            {
              text.title
            }

          </h2>

          <p className="mt-1 text-gray-500">

            {
              text.description
            }

          </p>

        </div>

        <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm">

          <p className="text-gray-500">

            {
              text
                .approvedRange
            }

          </p>

          <p className="mt-1 font-bold">

            {
              unit
                .minTemperature
            }
            {" °C – "}
            {
              unit
                .maxTemperature
            }
            {" °C"}

          </p>

        </div>

      </div>

      <div className="mt-6 h-96 w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={
              chartData
            }
            margin={{
              top:
                20,

              right:
                20,

              left:
                0,

              bottom:
                10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="dateLabel"
              minTickGap={
                25
              }
            />

            <YAxis
              domain={[
                yAxisMinimum,
                yAxisMaximum,
              ]}
              unit=" °C"
              width={
                65
              }
            />

            <Tooltip
              content={
                <CustomTooltip />
              }
            />

            <ReferenceLine
              y={
                unit
                  .minTemperature
              }
              stroke="#2563eb"
              strokeDasharray="6 6"
              label={{
                value:
                  text.minimum,

                position:
                  "insideBottomLeft",
              }}
            />

            <ReferenceLine
              y={
                unit
                  .maxTemperature
              }
              stroke="#dc2626"
              strokeDasharray="6 6"
              label={{
                value:
                  text.maximum,

                position:
                  "insideTopLeft",
              }}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              name={
                text.temperature
              }
              stroke="#16a34a"
              strokeWidth={
                3
              }
              dot={{
                r:
                  5,

                fill:
                  "#16a34a",
              }}
              activeDot={{
                r:
                  7,
              }}
              connectNulls
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}

export default TemperatureHistoryChart;
