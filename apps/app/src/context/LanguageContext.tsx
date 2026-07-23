import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Language } from "../i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext =
  createContext<LanguageContextValue | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

function getSavedLanguage(): Language {
  const savedLanguage =
    localStorage.getItem("24sju-language");

  if (
    savedLanguage === "sv" ||
    savedLanguage === "en" ||
    savedLanguage === "pl"
  ) {
    return savedLanguage;
  }

  return "sv";
}

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguage] =
    useState<Language>(getSavedLanguage);

  useEffect(() => {
    localStorage.setItem(
      "24sju-language",
      language
    );

    document.documentElement.lang =
      language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}