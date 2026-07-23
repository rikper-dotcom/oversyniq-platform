import { useState } from "react";

import pb from "../../services/pocketbase";

import {
  resolveIncident,
  type Incident,
} from "../../services/incidentService";

import IncidentInfo from "./IncidentInfo";

type IncidentDetailsProps = {
  incident: Incident;
  onResolved: () => void;
  onEdit: (incident: Incident) => void;
};

export default function IncidentDetails({
  incident,
  onResolved,
  onEdit,
}: IncidentDetailsProps) {
  const [saving, setSaving] = useState(false);

  const imageUrl =
    incident.image && incident.id
      ? pb.files.getURL(incident, incident.image)
      : null;

  async function handleResolve() {
    if (!incident.id) return;

    setSaving(true);

    try {
      await resolveIncident(incident.id);
      onResolved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {imageUrl && (
        <div className="overflow-hidden rounded-2xl border bg-gray-100">
          <img
            src={imageUrl}
            alt={incident.title}
            className="max-h-[420px] w-full object-cover"
          />
        </div>
      )}

      <IncidentInfo incident={incident} />

      <section className="rounded-2xl border bg-gray-50 p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Information
        </h3>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Rapporterad av
            </dt>
            <dd className="mt-1 text-gray-900">
              {incident.reportedBy}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Ansvarig
            </dt>
            <dd className="mt-1 text-gray-900">
              {incident.assignedTo ?? "Ej tilldelad"}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Skapad
            </dt>
            <dd className="mt-1 text-gray-900">
              {new Date(
                incident.created
              ).toLocaleString("sv-SE")}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Senast uppdaterad
            </dt>
            <dd className="mt-1 text-gray-900">
              {new Date(
                incident.updated
              ).toLocaleString("sv-SE")}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Åtgärder
        </h3>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
            Tilldela
          </button>

          <button
            onClick={() => onEdit(incident)}
            className="rounded-xl bg-amber-600 px-5 py-3 font-medium text-white transition hover:bg-amber-700"
          >
            Redigera
          </button>

          {incident.status !== "resolved" && (
            <button
              onClick={handleResolve}
              disabled={saving}
              className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
            >
              {saving
                ? "Sparar..."
                : "Markera som löst"}
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed p-5">
        <h3 className="mb-2 text-lg font-semibold">
          Historik
        </h3>

        <p className="text-sm text-gray-500">
          Historik och kommentarer kommer i nästa steg.
        </p>
      </section>
    </div>
  );
}