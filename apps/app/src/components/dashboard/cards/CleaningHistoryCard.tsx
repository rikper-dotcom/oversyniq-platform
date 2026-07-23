import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

export default function CleaningHistoryCard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = {
    sv: {
      title: "Städhistorik",
      description:
        "Se tidigare städregistreringar och checklistor.",
    },
    en: {
      title: "Cleaning History",
      description:
        "View previous cleaning records and checklists.",
    },
    pl: {
      title: "Historia sprzątania",
      description:
        "Przeglądaj wcześniejsze rejestry i listy sprzątania.",
    },
  }[language];

  return (
    <button
      type="button"
      onClick={() => navigate("/history")}
      className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 text-4xl">
        🗂️
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
