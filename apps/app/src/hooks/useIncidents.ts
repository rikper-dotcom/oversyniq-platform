import { useCallback, useEffect, useState } from "react";

import {
  createIncident,
  deleteIncident,
  getIncidents,
  resolveIncident,
  updateIncident,
  type CreateIncidentData,
  type Incident,
} from "../services/incidentService";

export default function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getIncidents();
      setIncidents(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function create(data: CreateIncidentData) {
    await createIncident(data);
    await refresh();
  }

  async function resolve(id: string) {
    await resolveIncident(id);
    await refresh();
  }

  async function update(
    id: string,
    data: Partial<Incident>
  ) {
    await updateIncident(id, data);
    await refresh();
  }

  async function remove(id: string) {
    await deleteIncident(id);
    await refresh();
  }

  return {
    incidents,
    loading,
    refresh,
    create,
    resolve,
    update,
    remove,
  };
}