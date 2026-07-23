import { useMemo, useState } from "react";
import type { Incident } from "../services/incidentService";

import useIncidents from "../hooks/useIncidents";

import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import SidePanel from "../components/layout/SidePanel";

import IncidentDetails from "../components/incidents/IncidentDetails";
import IncidentFilters from "../components/incidents/IncidentFilters";
import IncidentList from "../components/incidents/IncidentList";
import IncidentNavigation from "../components/incidents/IncidentNavigation";
import NewIncidentForm from "../components/incidents/NewIncidentForm";

export default function IncidentPage() {
  const { incidents, loading, refresh } = useIncidents();

  const [selectedIncident, setSelectedIncident] =
    useState<Incident | null>(null);

  const [editingIncident, setEditingIncident] =
    useState<Incident | null>(null);

  const [newIncidentOpen, setNewIncidentOpen] =
    useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const filtered = useMemo(() => {
    return incidents.filter((incident) => {
      if (incident.status === "resolved") {
        return false;
      }

      const text = search.toLowerCase();

      const matchesSearch =
        incident.title.toLowerCase().includes(text) ||
        incident.description
          .toLowerCase()
          .includes(text);

      const matchesStatus =
        statusFilter === "all" ||
        incident.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [incidents, search, statusFilter]);

  async function handleIncidentCreated() {
    setNewIncidentOpen(false);
    setEditingIncident(null);
    await refresh();
  }

  async function handleIncidentResolved() {
    setSelectedIncident(null);
    await refresh();
  }

  function handleEdit(incident: Incident) {
    setSelectedIncident(null);
    setEditingIncident(incident);
  }

  return (
    <>
      <PageContainer>
        <PageHeader
          title="⚠ Incidenter"
          subtitle="Hantera butikens aktiva incidenter."
        />

        <IncidentNavigation
          onNewIncident={() => setNewIncidentOpen(true)}
        />

        <IncidentFilters
          search={search}
          status={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          <div className="rounded-2xl bg-white p-8 shadow">
            Laddar...
          </div>
        ) : (
          <IncidentList
            incidents={filtered}
            onSelect={setSelectedIncident}
          />
        )}
      </PageContainer>

      <SidePanel
        open={selectedIncident !== null}
        title="Incident"
        onClose={() => setSelectedIncident(null)}
      >
        {selectedIncident && (
          <IncidentDetails
            incident={selectedIncident}
            onResolved={handleIncidentResolved}
            onEdit={handleEdit}
          />
        )}
      </SidePanel>

      <SidePanel
        open={newIncidentOpen}
        title="Ny incident"
        onClose={() => setNewIncidentOpen(false)}
      >
        <NewIncidentForm
          onCreated={handleIncidentCreated}
        />
      </SidePanel>

      <SidePanel
        open={editingIncident !== null}
        title="Redigera incident"
        onClose={() => setEditingIncident(null)}
      >
        {editingIncident && (
          <NewIncidentForm
            incident={editingIncident}
            onCreated={handleIncidentCreated}
          />
        )}
      </SidePanel>
    </>
  );
}