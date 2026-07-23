import type { Incident } from "../../services/incidentService";

import IncidentCard from "./IncidentCard";

type IncidentListProps = {
  incidents: Incident[];
  onSelect: (incident: Incident) => void;
};

export default function IncidentList({
  incidents,
  onSelect,
}: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">
          Inga incidenter hittades.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          onClick={() => onSelect(incident)}
        />
      ))}
    </div>
  );
}
