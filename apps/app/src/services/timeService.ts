import pb from "./pocketbase";

export type TimeEntry = {
  id: string;
  staff: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: "active" | "completed";
  manualEntry: boolean;
  comment: string;
  created: string;
  updated: string;
};

export type ManualTimeEntryData = {
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  comment: string;
};

export async function getActiveTimeEntry(
  staffId: string
) {
  try {
    const record = await pb
      .collection("time_entries")
      .getFirstListItem(
        `staff = "${staffId}" && status = "active"`
      );

    return record as unknown as TimeEntry;
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getCompletedTimeEntries(
  staffId: string
) {
  const records = await pb
    .collection("time_entries")
    .getFullList({
      filter:
        `staff = "${staffId}" && status = "completed"`,

      sort:
        "-startTime",
    });

  return records as unknown as TimeEntry[];
}

export async function startTimeEntry(
  staffId: string
) {
  const record = await pb
    .collection("time_entries")
    .create({
      staff:
        staffId,

      startTime:
        new Date().toISOString(),

      status:
        "active",

      manualEntry:
        false,

      comment:
        "",
    });

  return record as unknown as TimeEntry;
}

export async function stopTimeEntry(
  entry: TimeEntry
) {
  const endTime =
    new Date();

  const startTime =
    new Date(
      entry.startTime
    );

  const durationMinutes =
    Math.max(
      0,
      Math.round(
        (
          endTime.getTime() -
          startTime.getTime()
        ) /
        60000
      )
    );

  const record = await pb
    .collection("time_entries")
    .update(
      entry.id,
      {
        endTime:
          endTime.toISOString(),

        durationMinutes,

        status:
          "completed",
      }
    );

  return record as unknown as TimeEntry;
}

export async function createManualTimeEntry(
  data: ManualTimeEntryData
) {
  const startDate =
    new Date(
      `${data.date}T${data.startTime}`
    );

  const endDate =
    new Date(
      `${data.date}T${data.endTime}`
    );

  if (
    Number.isNaN(
      startDate.getTime()
    ) ||
    Number.isNaN(
      endDate.getTime()
    )
  ) {
    throw new Error(
      "INVALID_DATE"
    );
  }

  if (
    endDate.getTime() <=
    startDate.getTime()
  ) {
    throw new Error(
      "END_BEFORE_START"
    );
  }

  const durationMinutes =
    Math.round(
      (
        endDate.getTime() -
        startDate.getTime()
      ) /
      60000
    );

  const record = await pb
    .collection("time_entries")
    .create({
      staff:
        data.staffId,

      startTime:
        startDate.toISOString(),

      endTime:
        endDate.toISOString(),

      durationMinutes,

      status:
        "completed",

      manualEntry:
        true,

      comment:
        data.comment.trim(),
    });

  return record as unknown as TimeEntry;
}