import type { TranslationSchema } from "../schema";

import common from "./common";
import home from "./home";
import cleaning from "./cleaning";
import profile from "./profile";
import temperature from "./temperature";
import dashboard from "./dashboard";
import login from "./login";

export const pl: TranslationSchema = {
  common,

  messages: {
    saveSuccess: "Zapisano.",
    saveFailed: "Nie udało się zapisać.",
    loadFailed: "Nie udało się wczytać.",
    networkError: "Błąd sieci.",
    unknownError: "Wystąpił nieznany błąd.",
  },

  validation: {
    required: "To pole jest wymagane.",
    invalidEmail: "Nieprawidłowy adres e-mail.",
    invalidDate: "Nieprawidłowa data.",
    invalidTime: "Nieprawidłowa godzina.",
  },

  home,
  cleaning,
  profile,
  temperature,

  dashboard,
  login,
};
