const cleaning = {
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

  saveSuccess: "Sprzątanie zostało zarejestrowane!",
  saveError: "Nie udało się zapisać w PocketBase.",

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
} as const;

export default cleaning;
