import { Link } from "react-router-dom";

const modules = [
  {
    title: "Städ",
    description: "Hantera städuppgifter och veckoscheman.",
    path: "/admin/cleaning",
  },
  {
    title: "Temperaturkontroller",
    description: "Hantera kyl- och frystemperaturer.",
    path: "/admin/temperatures",
  },
  {
    title: "Checklistor",
    description: "Skapa och administrera checklistor.",
    path: "/admin/checklists",
  },
  {
    title: "Avvikelser",
    description: "Konfigurera avvikelsekategorier.",
    path: "/admin/incidents",
  },
  {
    title: "Butiker",
    description: "Administrera butiker och platser.",
    path: "/admin/stores",
  },
  {
    title: "Användare",
    description: "Hantera användare och roller.",
    path: "/admin/users",
  },
  {
    title: "Inställningar",
    description: "Globala inställningar för Oversyniq.",
    path: "/admin/settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        Administration
      </h1>

      <p className="text-gray-600 mb-8">
        Välj vilken del av systemet du vill administrera.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg hover:border-blue-500"
          >
            <h2 className="text-xl font-semibold mb-2">
              {module.title}
            </h2>

            <p className="text-gray-600">
              {module.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
