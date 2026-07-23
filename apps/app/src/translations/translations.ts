export type Language = "sv" | "en" | "pl";

export const translations = {
  sv: {
    languageName: "Svenska",

    home: {
      title: "24 Sju Hub",
      location: "Hjärtum",

      cleaning: "Städning",
      cleaningDescription: "Fyll i veckans städchecklista.",

      history: "Historik",
      historyDescription: "Visa tidigare städregistreringar.",

      staff: "Personal",
      staffDescription:
        "Logga in för temperaturer, rapportering och administration.",

      information: "Information",
      informationDescription:
        "Öppettider, kontaktuppgifter och information om butiken.",

      comingSoon: "Kommer snart",
    },

    cleaning: {
      title: "Städning",
      week: "Vecka",
      cleanerQuestion: "Vem har städat?",
      namePlaceholder: "Ange namn...",
      comment: "Kommentar",
      commentPlaceholder: "Skriv en kommentar...",
      register: "Registrera städning",
      saving: "Sparar...",
      tasksCompleted: "uppgifter klara",

      incompleteWarning:
        "uppgifter är inte slutförda.\n\nVill du registrera ändå?",

      saveSuccess:
        "Städningen har registrerats!",

      saveError:
        "Kunde inte spara till PocketBase.",
    },

    history: {
      title: "Städhistorik",
      registrations: "registreringar",
      loading: "Laddar historik...",
      empty: "Ingen historik finns ännu.",
      back: "Tillbaka",
      week: "Vecka",
      showDetails: "Visa detaljer",
      hideDetails: "Dölj detaljer",
      checklist: "Städchecklista",
      comment: "Kommentar",
    },

    progress: {
      of: "av",
      completed: "uppgifter klara",
    },
  },

  en: {
    languageName: "English",

    home: {
      title: "24 Sju Hub",
      location: "Hjärtum",

      cleaning: "Cleaning",
      cleaningDescription: "Complete this week's cleaning checklist.",

      history: "History",
      historyDescription: "View previous cleaning records.",

      staff: "Staff",
      staffDescription:
        "Log in for temperatures, reporting and administration.",

      information: "Information",
      informationDescription:
        "Opening hours, contact details and store information.",

      comingSoon: "Coming soon",
    },

    cleaning: {
      title: "Cleaning",
      week: "Week",
      cleanerQuestion: "Who completed the cleaning?",
      namePlaceholder: "Enter name...",
      comment: "Comment",
      commentPlaceholder: "Write a comment...",
      register: "Register cleaning",
      saving: "Saving...",
      tasksCompleted: "tasks completed",

      incompleteWarning:
        "tasks have not been completed.\n\nDo you want to register anyway?",

      saveSuccess:
        "The cleaning has been registered!",

      saveError:
        "Could not save to PocketBase.",
    },

    history: {
      title: "Cleaning history",
      registrations: "registrations",
      loading: "Loading history...",
      empty: "No cleaning history yet.",
      back: "Back",
      week: "Week",
      showDetails: "Show details",
      hideDetails: "Hide details",
      checklist: "Cleaning checklist",
      comment: "Comment",
    },

    progress: {
      of: "of",
      completed: "tasks completed",
    },
  },

  pl: {
    languageName: "Polski",

    home: {
      title: "24 Sju Hub",
      location: "Hjärtum",

      cleaning: "Sprzątanie",
      cleaningDescription: "Wypełnij tygodniową listę sprzątania.",

      history: "Historia",
      historyDescription: "Przeglądaj wcześniejsze rejestry sprzątania.",

      staff: "Personel",
      staffDescription:
        "Zaloguj się, aby zarządzać temperaturami, zgłoszeniami i administracją.",

      information: "Informacje",
      informationDescription:
        "Godziny otwarcia, dane kontaktowe i informacje o sklepie.",

      comingSoon: "Wkrótce",
    },

    cleaning: {
      title: "Sprzątanie",
      week: "Tydzień",
      cleanerQuestion: "Kto wykonał sprzątanie?",
      namePlaceholder: "Wpisz imię...",
      comment: "Komentarz",
      commentPlaceholder: "Napisz komentarz...",
      register: "Zarejestruj sprzątanie",
      saving: "Zapisywanie...",
      tasksCompleted: "ukończonych zadań",

      incompleteWarning:
        "zadań nie zostało ukończonych.\n\nCzy mimo to chcesz zapisać?",

      saveSuccess:
        "Sprzątanie zostało zarejestrowane!",

      saveError:
        "Nie udało się zapisać w PocketBase.",
    },

    history: {
      title: "Historia sprzątania",
      registrations: "rejestracji",
      loading: "Ładowanie historii...",
      empty: "Brak historii sprzątania.",
      back: "Wstecz",
      week: "Tydzień",
      showDetails: "Pokaż szczegóły",
      hideDetails: "Ukryj szczegóły",
      checklist: "Lista sprzątania",
      comment: "Komentarz",
    },

    progress: {
      of: "z",
      completed: "ukończonych zadań",
    },
  },
} as const;

export type Translations =
  (typeof translations)[Language];