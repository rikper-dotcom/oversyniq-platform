import { useMemo, useState } from "react";

import useIncidents from "../hooks/useIncidents";

import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";

import IncidentFilters from "../components/incidents/IncidentFilters";
import IncidentList from "../components/incidents/IncidentList";
import IncidentNavigation from "../components/incidents/IncidentNavigation";

export default function IncidentHistoryPage() {
  const { incidents, loading } = useIncidents();

  const [search, setSearch] = useState("");

  const resolvedIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      if (incident.status !== "resolved") {
        return false;
      }

      const text = search.toLowerCase();

      return (
        incident.title.toLowerCase().includes(text) ||
        incident.description
          .toLowerCase()
          .includes(text)
      );
    });
  }, [incidents, search]);

  return (
    <PageContainer>
      <PageHeader
        title="📚 Historik"
        subtitle="Lösta incidenter."
      />

      <IncidentNavigation
        onNewIncident={() => { }}
      />

      <IncidentFilters
        search={search}
        status="resolved"
        showStatusFilter={false}
        onSearchChange={setSearch}
        onStatusChange={() => { }}
      />
      {loading ? (
        <div className="rounded-2xl bg-white p-8 shadow">
        </div>
      ) : (
        <IncidentList
          incidents={resolvedIncidents}
          onSelect={() => { }}
        />
      )}
    </PageContainer>
  );
}