import TemperatureWidget from "./widgets/TemperatureWidget";
import CleaningWidget from "./widgets/CleaningWidget";
import IncidentWidget from "./widgets/IncidentWidget";

export default function DashboardWidgetRenderer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <TemperatureWidget />
      <CleaningWidget />
      <IncidentWidget />
    </div>
  );
}