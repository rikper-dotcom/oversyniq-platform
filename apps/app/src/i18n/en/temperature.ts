import type { TemperatureTranslation } from "../schema";

const temperature: TemperatureTranslation = {
  logging: {
    logoAlt: "24 Sju",
    title: "Temperature check",
    description:
      "Check and record the temperature of the store's refrigerators and freezers.",
    back: "Back to dashboard",
  },

  history: {
    logoAlt: "24 Sju",
    title: "Temperature History",
    description:
      "Monitor temperature trends in the store's refrigerators and freezers.",
    back: "Back to Administration",
  },

  status: {
    title: "Temperature status",
    description:
      "Overview of active temperature deviations in the store's refrigerators and freezers.",
    back: "Back to dashboard",
    activeDeviations: "Active deviations",
    noActiveDeviations: "No active deviations are available.",
    latestTemperature: "Latest temperature",
    expectedRange: "Expected range",
    latestReading: "Latest reading",
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
    loading: "Loading temperature status...",
    loadError: "Temperature status could not be loaded. Please try again.",
    quickActions: "Quick actions",
    viewHistory: "View temperature history",
    logNewTemperature: "Log new temperature",
    manageUnits: "Manage temperature units",
    futureFeature: "Coming soon",
  },
};

export default temperature;