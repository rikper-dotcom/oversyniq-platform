import type { TemperatureTranslation } from "../schema";

const temperature: TemperatureTranslation = {
  logging: {
    logoAlt: "24 Sju",
    title: "Temperaturkontroll",
    description:
      "Kontrollera och registrera temperaturen i butikens kylar och frysar.",
    back: "Tillbaka till översikten",
  },

  history: {
    logoAlt: "24 Sju",
    title: "Temperaturhistorik",
    description:
      "Följ temperaturutvecklingen i butikens kylar och frysar.",
    back: "Tillbaka till administration",
  },

  status: {
    title: "Temperaturstatus",
    description:
      "Översikt över aktiva temperaturavvikelser i butikens kylar och frysar.",
    back: "Tillbaka till dashboard",
    activeDeviations: "Aktiva avvikelser",
    noActiveDeviations: "Inga aktiva avvikelser finns.",
    latestTemperature: "Senaste temperatur",
    expectedRange: "Godkänt intervall",
    latestReading: "Senaste mätning",
    normal: "Normal",
    warning: "Varning",
    critical: "Kritisk",
    loading: "Laddar temperaturstatus...",
    loadError: "Temperaturstatus kunde inte hämtas. Försök igen.",
    quickActions: "Snabbåtgärder",
    viewHistory: "Visa temperaturhistorik",
    logNewTemperature: "Registrera ny temperatur",
    manageUnits: "Hantera temperaturenheter",
    futureFeature: "Kommer snart",
  },
};

export default temperature;