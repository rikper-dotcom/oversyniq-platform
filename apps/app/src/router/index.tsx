import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

import HomePage from "../pages/HomePage";
import CleaningPage from "../pages/CleaningPage";
import StaffLoginPage from "../pages/StaffLoginPage";
import DashboardPage from "../pages/DashboardPage";
import HistoryPage from "../pages/HistoryPage";
import TimeReportPage from "../pages/TimeReportPage";
import StaffTimeReportsPage from "../pages/StaffTimeReportsPage";
import TemperaturePage from "../pages/TemperaturePage";
import TemperatureStatusPage from "../pages/TemperatureStatusPage";
import TemperatureHistoryPage from "../pages/TemperatureHistoryPage";
import ProfilePage from "../pages/ProfilePage";
import StaffManagementPage from "../pages/StaffManagementPage";
import StoreSettingsPage from "../pages/StoreSettingsPage";
import IncidentPage from "../pages/IncidentPage";
import IncidentHistoryPage from "../pages/IncidentHistoryPage";
import AdminCleaningPage from "../pages/admin/AdminCleaningPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cleaning",
    element: <CleaningPage />,
  },
  {
    path: "/staff/login",
    element: <StaffLoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/incidents",
    element: (
      <ProtectedRoute>
        <IncidentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/incidents/history",
    element: (
      <ProtectedRoute>
        <IncidentHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/time-report",
    element: (
      <ProtectedRoute>
        <TimeReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/temperature",
    element: (
      <ProtectedRoute>
        <TemperaturePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/temperature/status",
    element: (
      <AdminRoute>
        <TemperatureStatusPage />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/staff",
    element: (
      <AdminRoute>
        <StaffManagementPage />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/time-reports",
    element: (
      <AdminRoute>
        <StaffTimeReportsPage />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/temperature-history",
    element: (
      <AdminRoute>
        <TemperatureHistoryPage />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/store",
    element: (
      <AdminRoute>
        <StoreSettingsPage />
      </AdminRoute>
    ),
  },
  {
  path: "/admin/cleaning",
  element: (
    <AdminRoute>
      <AdminCleaningPage />
    </AdminRoute>
  ),
},
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);
