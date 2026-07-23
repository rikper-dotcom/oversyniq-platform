import pb from "./pocketbase";

export interface CleaningSession {
  id?: string;
  cleanerName: string;
  completedAt: string;
  week: number;
  comment: string;
  tasks: Record<string, boolean>;
  completed: boolean;
  store: string;
  language: string;
  completedCount: number;
  totalTasks: number;
}

export interface CleaningDashboard {
  latestSession: CleaningSession | null;
  completedCount: number;
  totalTasks: number;
  percent: number;
  completedThisWeek: boolean;
}

export async function saveCleaningSession(data: CleaningSession) {
  return await pb.collection("cleaning_sessions").create(data);
}

export async function getCleaningSessions() {
  return await pb.collection("cleaning_sessions").getFullList({
    sort: "-completedAt",
    requestKey: null,
  });
}

export async function getCleaningSession(id: string) {
  return await pb.collection("cleaning_sessions").getOne(id, {
    requestKey: null,
  });
}

export async function deleteCleaningSession(id: string) {
  return await pb.collection("cleaning_sessions").delete(id);
}

export async function getCleaningDashboard(): Promise<CleaningDashboard> {
  const sessions =
    (await getCleaningSessions()) as unknown as CleaningSession[];

  if (sessions.length === 0) {
    return {
      latestSession: null,
      completedCount: 0,
      totalTasks: 0,
      percent: 0,
      completedThisWeek: false,
    };
  }

  const latest = sessions[0];

  const completedCount =
    latest.completedCount ??
    Object.values(latest.tasks ?? {}).filter(Boolean).length;

  const totalTasks =
    latest.totalTasks ??
    Object.keys(latest.tasks ?? {}).length;

  const percent =
    totalTasks > 0
      ? Math.round((completedCount / totalTasks) * 100)
      : 0;

  const currentWeek = (() => {
    const today = new Date();
    const firstDay =
      new Date(today.getFullYear(), 0, 1);

    const days =
      Math.floor(
        (today.getTime() - firstDay.getTime()) /
          86400000
      );

    return Math.ceil((days + firstDay.getDay() + 1) / 7);
  })();

  return {
    latestSession: latest,
    completedCount,
    totalTasks,
    percent,
    completedThisWeek:
      latest.week === currentWeek,
  };
}