import { useNavigate } from "react-router-dom";

import pb from "../services/pocketbase";

import { useTranslation } from "../hooks/useTranslation";

import StoreName from "../components/store/StoreName";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardWidgetRenderer from "../components/dashboard/DashboardWidgetRenderer";

import ProfileCard from "../components/dashboard/cards/ProfileCard";
import CleaningCard from "../components/dashboard/cards/CleaningCard";
import CleaningHistoryCard from "../components/dashboard/cards/CleaningHistoryCard";
import CleaningAdminCard from "../components/dashboard/cards/CleaningAdminCard";
import IncidentCard from "../components/dashboard/cards/IncidentCard";
import DashboardActionCard from "../components/dashboard/cards/DashboardActionCard";

import logo from "../assets/logo.png";

function DashboardPage() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const user = pb.authStore.record;

  const displayName =
    user?.name ||
    user?.email ||
    "Personal";

  const isAdmin =
    user?.role === "admin";

  const roleName =
    isAdmin
      ? t.dashboard.admin
      : t.dashboard.employee;

  function handleLogout() {
    pb.authStore.clear();

    navigate("/staff/login", {
      replace: true,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        <DashboardHeader
          logo={logo}
          welcome={t.dashboard.welcome}
          displayName={displayName}
          storeName={<StoreName />}
          roleName={roleName}
          logoutText={t.dashboard.logout}
          onLogout={handleLogout}
        />

        {isAdmin && (
          <section className="mb-8">
            <DashboardWidgetRenderer />
          </section>
        )}

        <section>

          <h2 className="mb-1 text-2xl font-bold">
            👤 {t.dashboard.staffFunctions}
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <ProfileCard
              title={t.dashboard.profile}
              description={t.dashboard.profileDescription}
            />

            <DashboardActionCard
              icon="⏱️"
              title={t.dashboard.timeReporting}
              description={t.dashboard.timeDescription}
              onClick={() => navigate("/time-report")}
            />

            <DashboardActionCard
              icon="🌡️"
              title={t.dashboard.temperature}
              description={t.dashboard.temperatureDescription}
              onClick={() => navigate("/temperature")}
            />

            <CleaningCard />

            <CleaningHistoryCard />

            <IncidentCard />

          </div>

        </section>
                {isAdmin && (
          <section className="mt-12">

            <div className="mb-5 border-t border-gray-300 pt-8">

              <h2 className="text-2xl font-bold">
                👑 {t.dashboard.administration}
              </h2>

              <p className="mt-1 text-gray-500">
                {t.dashboard.administrationDescription}
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <DashboardActionCard
                icon="📊"
                title={t.dashboard.staffTimeReports}
                description={t.dashboard.staffTimeReportsDescription}
                variant="admin"
                onClick={() =>
                  navigate("/admin/time-reports")
                }
              />

              <DashboardActionCard
                icon="📈"
                title={t.dashboard.temperatureHistory}
                description={t.dashboard.temperatureHistoryDescription}
                variant="admin"
                onClick={() =>
                  navigate("/admin/temperature-history")
                }
              />

              <DashboardActionCard
                icon="👥"
                title={t.dashboard.staffManagement}
                description={t.dashboard.staffManagementDescription}
                onClick={() =>
                  navigate("/admin/staff")
                }
              />

              <DashboardActionCard
                icon="⚙️"
                title={t.dashboard.settings}
                description={t.dashboard.settingsDescription}
                onClick={() =>
                  navigate("/admin/store")
                }
              />

              <CleaningAdminCard />

            </div>

          </section>
        )}

      </div>
    </div>
  );
}

export default DashboardPage;