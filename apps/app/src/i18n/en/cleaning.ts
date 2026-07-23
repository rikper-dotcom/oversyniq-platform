const cleaning = {
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

  saveSuccess: "The cleaning has been registered!",
  saveError: "Could not save to PocketBase.",

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
} as const;

export default cleaning;
