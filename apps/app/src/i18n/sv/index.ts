import type { TranslationSchema } from "../schema";

import common from "./common";
import home from "./home";
import cleaning from "./cleaning";
import profile from "./profile";
import temperature from "./temperature";
import dashboard from "./dashboard";
import login from "./login";

export const sv: TranslationSchema = {
  common,

  messages: {
    saveSuccess: "Sparades.",
    saveFailed: "Kunde inte sparas.",
    loadFailed: "Kunde inte hämtas.",
    networkError: "Nätverksfel.",
    unknownError: "Ett okänt fel inträffade.",
  },

  validation: {
    required: "Obligatoriskt fält.",
    invalidEmail: "Ogiltig e-postadress.",
    invalidDate: "Ogiltigt datum.",
    invalidTime: "Ogiltig tid.",
  },

  home,
  cleaning,
  profile,
  temperature,

  dashboard,
  login,
};
