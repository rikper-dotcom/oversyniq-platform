import pb from "./pocketbase";
import { getWeekNumber } from "../utils/date";

export type CleaningTaskRecord = {
  id: string;
  title_sv: string;
  title_en: string;
  title_pl: string;
  frequency: "daily" | "weekly" | "biweekly" | "monthly";
  active: boolean;
  sortOrder: number;
};

export type CleaningTask = {
  id: string;
  labels: {
    sv: string;
    en: string;
    pl: string;
  };
};

const COLLECTION = "cleaning_tasks";

export async function getCleaningTasks(): Promise<CleaningTaskRecord[]> {
  return await pb.collection(COLLECTION).getFullList<CleaningTaskRecord>({
    filter: "active = true",
    sort: "sortOrder",
  });
}

export async function getAllCleaningTasks(): Promise<CleaningTaskRecord[]> {
  return await pb.collection(COLLECTION).getFullList<CleaningTaskRecord>({
    sort: "sortOrder",
  });
}

export async function getTasksForWeek(
  date: Date = new Date()
): Promise<CleaningTask[]> {
  const week = getWeekNumber(date);
  const evenWeek = week % 2 === 0;

  const records = await getCleaningTasks();

  return records
    .filter((task) => {
      switch (task.frequency) {
        case "daily":
          return true;

        case "weekly":
          return true;

        case "biweekly":
          return evenWeek;

        case "monthly":
          return false;

        default:
          return false;
      }
    })
    .map((task) => ({
      id: task.id,
      labels: {
        sv: task.title_sv,
        en: task.title_en,
        pl: task.title_pl,
      },
    }));
}

export async function createCleaningTask(
  task: Omit<CleaningTaskRecord, "id">
) {
  return await pb.collection(COLLECTION).create(task);
}

export async function updateCleaningTask(
  id: string,
  task: Partial<Omit<CleaningTaskRecord, "id">>
) {
  return await pb.collection(COLLECTION).update(id, task);
}

export async function disableCleaningTask(id: string) {
  return await pb.collection(COLLECTION).update(id, {
    active: false,
  });
}

export async function enableCleaningTask(id: string) {
  return await pb.collection(COLLECTION).update(id, {
    active: true,
  });
}

export async function moveTaskUp(task: CleaningTaskRecord) {
  const previous = (
    await getAllCleaningTasks()
  )
    .filter((t) => t.sortOrder < task.sortOrder)
    .sort((a, b) => b.sortOrder - a.sortOrder)[0];

  if (!previous) {
    return;
  }

  await updateCleaningTask(task.id, {
    sortOrder: previous.sortOrder,
  });

  await updateCleaningTask(previous.id, {
    sortOrder: task.sortOrder,
  });
}

export async function moveTaskDown(task: CleaningTaskRecord) {
  const next = (
    await getAllCleaningTasks()
  )
    .filter((t) => t.sortOrder > task.sortOrder)
    .sort((a, b) => a.sortOrder - b.sortOrder)[0];

  if (!next) {
    return;
  }

  await updateCleaningTask(task.id, {
    sortOrder: next.sortOrder,
  });

  await updateCleaningTask(next.id, {
    sortOrder: task.sortOrder,
  });
}