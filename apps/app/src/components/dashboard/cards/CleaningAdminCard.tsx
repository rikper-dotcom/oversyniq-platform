import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

export default function CleaningAdminCard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = {
    sv: {
      title: "Städadministration",
      description:
        "Hantera städuppgifter, sortering och inställningar.",
    },
    en: {
      title: "Cleaning Administration",
      description:
        "Manage cleaning tasks, sorting and settings.",
    },
    pl: {
      title: "Administracja sprzątaniem",
      description:
        "Zarządzaj zadaniami sprzątania, kolejnością i ustawieniami.",
    },
  }[language];

  return (
    <button
      type="button"
      onClick={() => navigate("/admin/cleaning")}
      className="rounded-2xl border border-blue-200 bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
    >
      <div className="mb-4 text-4xl">
        ⚙️🧹
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
