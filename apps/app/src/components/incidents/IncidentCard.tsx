import pb from "../../services/pocketbase";

import {
  getCategoryBadge,
  getPriorityBadge,
  getStatusBadge,
} from "../../lib/incidentHelpers";

import type { Incident } from "../../services/incidentService";

type IncidentCardProps = {
  incident: Incident;
  onClick?: () => void;
};

export default function IncidentCard({
  incident,
  onClick,
}: IncidentCardProps) {
  const category = getCategoryBadge(incident.category);
  const priority = getPriorityBadge(incident.priority);
  const status = getStatusBadge(incident.status);

  const imageUrl =
    incident.image && incident.id
      ? pb.files.getURL(incident, incident.image)
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl bg-white text-left shadow transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden"
    >
      {imageUrl && (
        <div className="h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={incident.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {incident.title}
            </h2>

            {incident.description && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {incident.description}
              </p>
            )}
          </div>

          <span className="ml-4 text-xl text-gray-300 transition group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
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

        <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
          <span>
            👤 {incident.reportedBy}
          </span>

          <span>
            {new Date(incident.created).toLocaleString("sv-SE")}
          </span>
        </div>
      </div>
    </button>
  );
}