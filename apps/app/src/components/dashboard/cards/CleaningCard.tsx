import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

export default function CleaningCard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = {
    sv: {
      title: "Städning",
      description:
        "Registrera veckostädning och checklista.",
    },
    en: {
      title: "Cleaning",
      description:
        "Register weekly cleaning and complete the checklist.",
    },
    pl: {
      title: "Sprzątanie",
      description:
        "Zarejestruj cotygodniowe sprzątanie i listę kontrolną.",
    },
  }[language];

  return (
    <button
      type="button"
      onClick={() => navigate("/cleaning")}
      className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 text-4xl">
        🧹
      </div>

      <h3 className="text-xl font-bold">
        {text.title}
      </h3>

      <p className="mt-2 text-gray-500">
        {text.description}
      </p>
    </button>
  );
}
