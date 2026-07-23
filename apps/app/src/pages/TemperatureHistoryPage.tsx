import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

import {
  useTranslation,
} from "../hooks/useTranslation";

import TemperatureHistoryDashboard from "../components/temperature/TemperatureHistoryDashboard";

function TemperatureHistoryPage() {
  const navigate =
    useNavigate();

  const {
    language,
    t,
  } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-6xl">

        <header className="mb-8 rounded-3xl bg-white p-6 shadow-xl">

          <div className="flex flex-col items-center gap-5 sm:flex-row">

            <img
              src={logo}
              alt={
                t.temperature.history.logoAlt
              }
              className="h-20 w-20 object-contain"
            />

            <div className="flex-1 text-center sm:text-left">

              <div className="mb-2 text-4xl">

                📈

              </div>

              <h1 className="text-3xl font-bold">

                {t.temperature.history.title}

              </h1>

              <p className="mt-2 text-gray-500">

                {t.temperature.history.description}

              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="w-full rounded-xl bg-gray-200 px-5 py-3 font-medium transition hover:bg-gray-300 sm:w-auto"
            >

              ← {t.temperature.history.back}

            </button>

          </div>

        </header>

        <TemperatureHistoryDashboard
          language={
            language
          }
        />

        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          className="mt-8 w-full rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300"
        >

          ← {t.temperature.history.back}

        </button>

      </div>

    </div>
  );
}

export default TemperatureHistoryPage;