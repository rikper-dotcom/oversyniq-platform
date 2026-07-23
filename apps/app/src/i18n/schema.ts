export interface CommonTranslation {
  save: string;
  cancel: string;
  close: string;
  back: string;
  edit: string;
  delete: string;
  add: string;
  create: string;
  update: string;
  search: string;
  loading: string;
  yes: string;
  no: string;
  logout: string;
}

export interface MessagesTranslation {
  saveSuccess: string;
  saveFailed: string;
  loadFailed: string;
  networkError: string;
  unknownError: string;
}

export interface ValidationTranslation {
  required: string;
  invalidEmail: string;
  invalidDate: string;
  invalidTime: string;
}

export interface HomeTranslation {
  title: string;
  location: string;

  cleaning: string;
  cleaningDescription: string;

  history: string;
  historyDescription: string;

  staff: string;
  staffDescription: string;

  information: string;
  informationDescription: string;

  comingSoon: string;
}

export interface CleaningTranslation {
  title: string;
  week: string;

  cleanerQuestion: string;
  namePlaceholder: string;

  comment: string;
  commentPlaceholder: string;

  register: string;
  saving: string;

  tasksCompleted: string;

  incompleteWarning: string;

  saveSuccess: string;
  saveError: string;

  history: {
    title: string;
    registrations: string;
    loading: string;
    empty: string;
    back: string;
    week: string;
    showDetails: string;
    hideDetails: string;
    checklist: string;
    comment: string;
  };

  progress: {
    of: string;
    completed: string;
  };
}

export interface ProfileTranslation {
  general: {
    title: string;
    description: string;
    back: string;
    missingProfile: string;
  };

  profile: {
    title: string;

    fullName: string;
    displayName: string;
    displayNameHelp: string;

    email: string;
    emailHelp: string;

    phone: string;

    language: string;

    swedish: string;
    english: string;
    polish: string;

    role: string;

    admin: string;
    employee: string;

    save: string;
    saving: string;

    profileSaved: string;
    profileError: string;
  };

  password: {
    title: string;
    description: string;

    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    changePassword: string;
    changingPassword: string;

    passwordChanged: string;
    passwordMismatch: string;
    passwordLength: string;
    passwordError: string;
  };
}

export interface TemperatureTranslation {
  logging: {
    logoAlt: string;
    title: string;
    description: string;
    back: string;
  };

  history: {
    logoAlt: string;
    title: string;
    description: string;
    back: string;
  };

  status: {
    title: string;
    description: string;
    back: string;
    activeDeviations: string;
    noActiveDeviations: string;
    latestTemperature: string;
    expectedRange: string;
    latestReading: string;
    normal: string;
    warning: string;
    critical: string;
    loading: string;
    loadError: string;
    quickActions: string;
    viewHistory: string;
    logNewTemperature: string;
    manageUnits: string;
    futureFeature: string;
  };
}

export interface DashboardTranslation {
  welcome: string;
  admin: string;
  employee: string;

  staffFunctions: string;

  profile: string;
  profileDescription: string;

  timeReporting: string;
  timeDescription: string;

  cleaning: string;
  cleaningDescription: string;

  temperature: string;
  temperatureDescription: string;

  faultReporting: string;
  faultDescription: string;

  administration: string;
  administrationDescription: string;

  staffTimeReports: string;
  staffTimeReportsDescription: string;

  cleaningHistory: string;
  cleaningHistoryDescription: string;

  temperatureHistory: string;
  temperatureHistoryDescription: string;

  settings: string;
  settingsDescription: string;

  staffManagement: string;
  staffManagementDescription: string;

  logout: string;
}

export interface LoginTranslation {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  login: string;
  loggingIn: string;
  back: string;
  error: string;
  inactiveAccount: string;
}

export interface TranslationSchema {
  common: CommonTranslation;
  messages: MessagesTranslation;
  validation: ValidationTranslation;

  home: HomeTranslation;
  cleaning: CleaningTranslation;
  profile: ProfileTranslation;
  temperature: TemperatureTranslation;

  dashboard: DashboardTranslation;
  login: LoginTranslation;
}
