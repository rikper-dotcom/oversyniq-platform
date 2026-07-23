import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import HomeMenuButton from "../components/HomeMenuButton";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

import type { Language } from "../i18n";

type LanguageButtonProps = {
  flag: string;
  label: string;
  value: Language;
  selected: boolean;
  onSelect: (language: Language) => void;
};

function LanguageButton({
  flag,
  label,
  value,
  selected,
  onSelect,
}: LanguageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-label={label}
      aria-pressed={selected}
      title={label}
      className={`
        flex h-14 w-14
        items-center justify-center
        rounded-2xl
        border-2
        text-3xl
        transition
        duration-200
        hover:scale-110
        ${
          selected
            ? "border-green-600 bg-green-50 shadow-md"
            : "border-transparent hover:bg-gray-100"
        }
      `}
    >
      {flag}
    </button>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  function showInformation() {
    const messages: Record<Language, string> = {
      sv: "Kommer snart",
      en: "Coming soon",
      pl: "Wkrótce",
    };

    alert(messages[language]);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="24 Sju"
            className="h-32 w-32 object-contain"
          />
        </div>

        <h1 className="text-center text-4xl font-bold">
          {t.home.title}
        </h1>

        <p className="mb-8 text-center text-gray-500">
          {t.home.location}
        </p>

        <div className="mb-8 flex justify-center gap-3">
          <LanguageButton
            flag="🇸🇪"
            label="Svenska"
            value="sv"
            selected={language === "sv"}
            onSelect={setLanguage}
          />

          <LanguageButton
            flag="🇬🇧"
            label="English"
            value="en"
            selected={language === "en"}
            onSelect={setLanguage}
          />

          <LanguageButton
            flag="🇵🇱"
            label="Polski"
            value="pl"
            selected={language === "pl"}
            onSelect={setLanguage}
          />
        </div>

        <div className="space-y-4">
          <HomeMenuButton
            icon="cleaning"
            title={t.home.cleaning}
            subtitle={t.home.cleaningDescription}
            onClick={() => navigate("/cleaning")}
          />

          <HomeMenuButton
            icon="staff"
            title={t.home.staff}
            subtitle={t.home.staffDescription}
            onClick={() => navigate("/staff/login")}
          />

          <HomeMenuButton
            icon="information"
            title={t.home.information}
            subtitle={t.home.informationDescription}
            onClick={showInformation}
          />
        </div>
      </div>
    </div>
  );
}