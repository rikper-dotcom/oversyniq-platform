import type { TranslationSchema } from "../schema";

import common from "./common";
import home from "./home";
import cleaning from "./cleaning";
import profile from "./profile";
import temperature from "./temperature";
import dashboard from "./dashboard";
import login from "./login";

export const en: TranslationSchema = {
  common,

  messages: {
    saveSuccess: "Saved.",
    saveFailed: "Could not save.",
    loadFailed: "Could not load.",
    networkError: "Network error.",
    unknownError: "An unknown error occurred.",
  },

  validation: {
    required: "This field is required.",
    invalidEmail: "Invalid email address.",
    invalidDate: "Invalid date.",
    invalidTime: "Invalid time.",
  },

  home,
  cleaning,
  profile,
  temperature,

  dashboard,
  login,
};
