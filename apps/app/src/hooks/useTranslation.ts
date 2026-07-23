import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n";

export function useTranslation() {
  const { language } = useLanguage();

  return {
    language,
    t: translations[language],
  };
}