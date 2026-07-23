import { useNavigate } from "react-router-dom";

import DashboardCard from "../DashboardCard";

export default function IncidentCard() {
  const navigate = useNavigate();

  return (
    <DashboardCard
      icon="🚨"
      title="Incidenter"
      description="Rapportera och hantera aktiva incidenter."
      onClick={() => navigate("/incidents")}
    />
  );
}
