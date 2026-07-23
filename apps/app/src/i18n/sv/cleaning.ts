const cleaning = {
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

  saveSuccess: "Städningen har registrerats!",
  saveError: "Kunde inte spara till PocketBase.",

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
} as const;

export default cleaning;
