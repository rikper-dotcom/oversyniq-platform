import { sv } from "./sv";
import { en } from "./en";
import { pl } from "./pl";

export const translations = {
  sv,
  en,
  pl,
} as const;

export type Language = keyof typeof translations;

export { sv, en, pl };