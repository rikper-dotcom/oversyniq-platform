import type { Incident } from "../../services/incidentService";

import {
  getCategoryBadge,
  getPriorityBadge,
  getStatusBadge,
} from "../../lib/incidentHelpers";

type Props = {
  incident: Incident;
};

export default function IncidentInfo({
  incident,
}: Props) {
  const category = getCategoryBadge(incident.category);
  const priority = getPriorityBadge(incident.priority);
  const status = getStatusBadge(incident.status);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold">
          {incident.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${category.className}`}
          >
            {category.icon} {incident.category}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${priority.className}`}
          >
            {priority.label}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Beskrivning
        </h2>

        <div className="rounded-xl bg-gray-50 p-4">
          {incident.description || "Ingen beskrivning finns."}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Rapporterad av
          </h2>

          <p>{incident.reportedBy || "Okänd"}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Skapad
          </h2>

          <p>
            {new Date(incident.created).toLocaleString("sv-SE")}
          </p>
        </div>
      </section>
    </div>
  );
}
