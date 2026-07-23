import type { TemperatureTranslation } from "../schema";

const temperature: TemperatureTranslation = {
  logging: {
    logoAlt: "24 Sju",
    title: "Kontrola temperatury",
    description:
      "Sprawdź i zarejestruj temperaturę lodówek i zamrażarek w sklepie.",
    back: "Powrót do panelu",
  },

  history: {
    logoAlt: "24 Sju",
    title: "Historia temperatur",
    description:
      "Śledź zmiany temperatury lodówek i zamrażarek w sklepie.",
    back: "Powrót do administracji",
  },

  status: {
    title: "Status temperatur",
    description:
      "Przegląd aktywnych odchyleń temperatury w lodówkach i zamrażarkach sklepu.",
    back: "Powrót do panelu",
    activeDeviations: "Aktywne odchylenia",
    noActiveDeviations: "Brak aktywnych odchyleń.",
    latestTemperature: "Ostatnia temperatura",
    expectedRange: "Dopuszczalny zakres",
    latestReading: "Ostatni pomiar",
    normal: "Prawidłowy",
    warning: "Ostrzeżenie",
    critical: "Krytyczny",
    loading: "Ładowanie statusu temperatur...",
    loadError: "Nie udało się pobrać statusu temperatur. Spróbuj ponownie.",
    quickActions: "Szybkie działania",
    viewHistory: "Zobacz historię temperatur",
    logNewTemperature: "Zarejestruj nową temperaturę",
    manageUnits: "Zarządzaj urządzeniami temperatury",
    futureFeature: "Wkrótce",
  },
};

export default temperature;