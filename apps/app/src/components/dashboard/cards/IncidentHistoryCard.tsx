import { useNavigate } from "react-router-dom";

import DashboardCard from "../DashboardCard";

export default function IncidentHistoryCard() {
  const navigate = useNavigate();

  return (
    <DashboardCard
      icon="📚"
      title="Incidenthistorik"
      description="Visa lösta incidenter och tidigare ärenden."
      onClick={() => navigate("/incidents/history")}
    />
  );
}
