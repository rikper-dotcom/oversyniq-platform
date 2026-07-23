import pb from "./pocketbase";

export type TemperatureUnit = {
  id: string;
  name: string;
  type:
    | "fridge"
    | "freezer";
  minTemperature: number;
  maxTemperature: number;
  active: boolean;
  sortOrder: number;
  created: string;
  updated: string;
};

export type TemperatureStaff = {
  id: string;
  name: string;
  email: string;
  role:
    | "admin"
    | "employee";
};

export type TemperatureReading = {
  id: string;
  unit: string;
  staff: string;
  temperature: number;
  status:
    | "normal"
    | "deviation";
  comment: string;
  created: string;
  updated: string;

  expand?: {
    unit?: TemperatureUnit;
    staff?: TemperatureStaff;
  };
};

export type TemperatureReadingStatus =
  | "normal"
  | "deviation";

type CreateTemperatureReadingData = {
  unit: TemperatureUnit;
  staffId: string;
  temperature: number;
  comment?: string;
};

export async function getActiveTemperatureUnits() {
  const records =
    await pb
      .collection("temperature_units")
      .getFullList({
        filter: "active = true",
        sort: "sortOrder,name",
        requestKey: null,
      });

  return records as unknown as TemperatureUnit[];
}

export function getTemperatureStatus(
  unit: TemperatureUnit,
  temperature: number
): TemperatureReadingStatus {
  const isWithinRange =
    temperature >= unit.minTemperature &&
    temperature <= unit.maxTemperature;

  return isWithinRange
    ? "normal"
    : "deviation";
}

export async function createTemperatureReading({
  unit,
  staffId,
  temperature,
  comment = "",
}: CreateTemperatureReadingData) {
  const status =
    getTemperatureStatus(
      unit,
      temperature
    );

  const record =
    await pb
      .collection("temperature_readings")
      .create({
        unit: unit.id,
        staff: staffId,
        temperature,
        status,
        comment: comment.trim(),
      });

  return record as unknown as TemperatureReading;
}

export async function getTemperatureReadings(
  limit = 500
) {
  const records =
    await pb
      .collection("temperature_readings")
      .getList(
        1,
        limit,
        {
          sort: "-created",
          expand: "unit,staff",
          requestKey: null,
        }
      );

  return records.items as unknown as TemperatureReading[];
}

export type TemperatureDashboard = {
  totalUnits: number;
  checkedUnits: number;
  deviations: number;
  allOk: boolean;
  latestCheck: string | null;
  checkedBy: string | null;
};

type LatestTemperatureReading = {
  unit: TemperatureUnit;
  reading: TemperatureReading;
};

export type TemperatureDeviationSeverity =
  | "warning"
  | "critical";

export type TemperatureDeviation = {
  unit: TemperatureUnit;
  reading: TemperatureReading;
  severity: TemperatureDeviationSeverity;
};

function getLatestTemperatureReadings(
  units: TemperatureUnit[],
  readings: TemperatureReading[]
): LatestTemperatureReading[] {
  return units.flatMap(
    (unit) => {
      const reading =
        readings.find(
          (currentReading) =>
            currentReading.unit === unit.id
        );

      return reading
        ? [{ unit, reading }]
        : [];
    }
  );
}

function getTemperatureDeviationSeverity(
  unit: TemperatureUnit,
  temperature: number
): TemperatureDeviationSeverity {
  const distanceFromRange =
    temperature < unit.minTemperature
      ? unit.minTemperature - temperature
      : temperature - unit.maxTemperature;

  return distanceFromRange >= 2
    ? "critical"
    : "warning";
}

export async function getActiveTemperatureDeviations(): Promise<TemperatureDeviation[]> {
  const [units, readings] = await Promise.all([
    getActiveTemperatureUnits(),
    getTemperatureReadings(),
  ]);

  return getLatestTemperatureReadings(
    units,
    readings
  )
    .filter(
      ({ reading }) =>
        reading.status === "deviation"
    )
    .map(
      ({ unit, reading }) => ({
        unit,
        reading,
        severity: getTemperatureDeviationSeverity(
          unit,
          reading.temperature
        ),
      })
    );
}

export async function getTemperatureDashboard(): Promise<TemperatureDashboard> {
  const [units, readings] = await Promise.all([
    getActiveTemperatureUnits(),
    getTemperatureReadings(),
  ]);

  if (units.length === 0) {
    return {
      totalUnits: 0,
      checkedUnits: 0,
      deviations: 0,
      allOk: true,
      latestCheck: null,
      checkedBy: null,
    };
  }

  const latestReadings =
    getLatestTemperatureReadings(
      units,
      readings
    ).map(
      ({ reading }) => reading
    );

  const latestCheck =
    latestReadings.length > 0
      ? latestReadings.reduce(
          (latest, current) =>
            new Date(current.created) >
            new Date(latest.created)
              ? current
              : latest
        )
      : null;

  const deviations =
    latestReadings.filter(
      (reading) =>
        reading.status ===
        "deviation"
    ).length;

  return {
    totalUnits: units.length,
    checkedUnits: latestReadings.length,
    deviations,
    allOk:
      latestReadings.length === units.length &&
      deviations === 0,
    latestCheck:
      latestCheck?.created ?? null,
    checkedBy:
      latestCheck?.expand?.staff?.name ??
      null,
  };
}
