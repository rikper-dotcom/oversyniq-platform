import pb from "./pocketbase";

export type IncidentPriority = "low" | "medium" | "high";

export type IncidentStatus =
  | "open"
  | "in_progress"
  | "resolved";

export interface Incident {
  id?: string;
  title: string;
  description: string;
  category: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  reportedBy: string;
  assignedTo?: string;
  image?: string;
  resolvedAt?: string;
  created: string;
  updated: string;
}

export interface CreateIncidentData {
  title: string;
  description: string;
  category: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  image?: File;
}

export interface IncidentDashboard {
  open: number;
  inProgress: number;
  resolved: number;
  highPriority: number;
  latestIncident: Incident | null;
}

export async function createIncident(
  data: CreateIncidentData
) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("priority", data.priority);
  formData.append("status", data.status);

  formData.append(
    "reportedBy",
    pb.authStore.record?.name ??
      pb.authStore.record?.email ??
      "Okänd"
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  return await pb.collection("incidents").create(formData);
}

export async function getIncidents(): Promise<Incident[]> {
  return (await pb.collection("incidents").getFullList({
    sort: "-created",
    requestKey: null,
  })) as unknown as Incident[];
}

export async function getIncident(
  id: string
): Promise<Incident> {
  return (await pb.collection("incidents").getOne(id, {
    requestKey: null,
  })) as unknown as Incident;
}

export async function updateIncident(
  id: string,
  data: Partial<Incident>
) {
  return await pb.collection("incidents").update(id, data);
}

export async function resolveIncident(id: string) {
  return await pb.collection("incidents").update(id, {
    status: "resolved",
    resolvedAt: new Date().toISOString(),
  });
}

export async function deleteIncident(id: string) {
  return await pb.collection("incidents").delete(id);
}

export async function getIncidentDashboard(): Promise<IncidentDashboard> {
  const incidents = await getIncidents();

  return {
    open: incidents.filter(
      (i) => i.status === "open"
    ).length,

    inProgress: incidents.filter(
      (i) => i.status === "in_progress"
    ).length,

    resolved: incidents.filter(
      (i) => i.status === "resolved"
    ).length,

    highPriority: incidents.filter(
      (i) =>
        i.priority === "high" &&
        i.status !== "resolved"
    ).length,

    latestIncident:
      incidents.length > 0
        ? incidents[0]
        : null,
  };
}