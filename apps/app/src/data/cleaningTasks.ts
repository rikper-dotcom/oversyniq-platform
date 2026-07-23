import type {
  Language,
} from "../translations/translations";

export type CleaningTaskData = {
  id: string;

  labels: Record<
    Language,
    string
  >;
};

export const weeklyTasks: CleaningTaskData[] = [
  {
    id: "vacuum_and_mop_floors",

    labels: {
      sv: "Dammsug och våttorka golv",
      en: "Vacuum and wet mop the floors",
      pl: "Odkurz i umyj podłogi",
    },
  },

  {
    id: "clean_entrance_door",

    labels: {
      sv: "Rengör entrédörr",
      en: "Clean the entrance door",
      pl: "Wyczyść drzwi wejściowe",
    },
  },

  {
    id: "clean_entrance_windows",

    labels: {
      sv: "Putsa entréfönster",
      en: "Clean the entrance windows",
      pl: "Umyj okna przy wejściu",
    },
  },

  {
    id: "wipe_refrigerator_doors",

    labels: {
      sv: "Torka kyldörrar",
      en: "Wipe the refrigerator doors",
      pl: "Wytrzyj drzwi lodówek",
    },
  },

  {
    id: "wipe_freezer_doors",

    labels: {
      sv: "Torka frysdörrar",
      en: "Wipe the freezer doors",
      pl: "Wytrzyj drzwi zamrażarek",
    },
  },

  {
    id: "wipe_chest_freezers",

    labels: {
      sv: "Torka frysboxar",
      en: "Wipe the chest freezers",
      pl: "Wytrzyj zamrażarki skrzyniowe",
    },
  },

  {
    id: "wipe_checkout_counter",

    labels: {
      sv: "Torka kassadisk",
      en: "Wipe the checkout counter",
      pl: "Wytrzyj ladę kasową",
    },
  },

  {
    id: "wipe_checkout_screen",

    labels: {
      sv: "Torka kassaskärm",
      en: "Wipe the checkout screen",
      pl: "Wytrzyj ekran kasy",
    },
  },
];

export const biWeeklyTasks: CleaningTaskData[] = [
  {
    id: "dust_empty_shelf_areas",

    labels: {
      sv: "Dammtorka tomma ytor på hyllor",
      en: "Dust empty areas on the shelves",
      pl: "Wytrzyj kurz z pustych miejsc na półkach",
    },
  },

  {
    id: "dust_shelving_units",

    labels: {
      sv: "Dammtorka hyllställningar",
      en: "Dust the shelving units",
      pl: "Wytrzyj kurz z regałów",
    },
  },
];