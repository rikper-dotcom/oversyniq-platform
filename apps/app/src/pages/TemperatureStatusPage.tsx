import PageHeader from "../components/layout/PageHeader";
import PageLayout from "../components/layout/PageLayout";
import TemperatureStatusOverview from "../components/temperature/TemperatureStatusOverview";
import { useTranslation } from "../hooks/useTranslation";

function TemperatureStatusPage() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <PageHeader
        icon="🌡️"
        title={t.temperature.status.title}
        subtitle={t.temperature.status.description}
        backLabel={t.temperature.status.back}
      />

      <TemperatureStatusOverview />
    </PageLayout>
  );
}

export default TemperatureStatusPage;
