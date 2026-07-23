import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

import {
  useLanguage,
} from "../context/LanguageContext";

import AdminStaffCard from "../components/admin/AdminStaffCard";

import AdminTimeExport from "../components/admin/AdminTimeExport";

import {
  getAdminTimeReportData,
  type StaffMember,
} from "../services/adminTimeService";

import type {
  TimeEntry,
} from "../services/timeService";

function StaffTimeReportsPage() {
  const navigate =
    useNavigate();

  const {
    language,
  } = useLanguage();

  const [
    staffMembers,
    setStaffMembers,
  ] = useState<
    StaffMember[]
  >([]);

  const [
    timeEntries,
    setTimeEntries,
  ] = useState<
    TimeEntry[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    error,
    setError,
  ] = useState(
    ""
  );

  const text = {
    sv: {
      title:
        "Personalens tidsrapporter",

      description:
        "Översikt över personalens arbetspass och registrerade arbetstid.",

      loading:
        "Laddar personalens tidsrapporter...",

      error:
        "Tidsrapporterna kunde inte hämtas. Kontrollera behörigheterna och försök igen.",

      empty:
        "Ingen personal hittades.",

      back:
        "Tillbaka till administration",
    },

    en: {
      title:
        "Staff time reports",

      description:
        "Overview of staff work shifts and registered working time.",

      loading:
        "Loading staff time reports...",

      error:
        "The time reports could not be loaded. Check the permissions and try again.",

      empty:
        "No staff members were found.",

      back:
        "Back to administration",
    },

    pl: {
      title:
        "Ewidencja czasu personelu",

      description:
        "Przegląd zmian i zarejestrowanego czasu pracy personelu.",

      loading:
        "Ładowanie ewidencji czasu personelu...",

      error:
        "Nie udało się pobrać raportów czasu. Sprawdź uprawnienia i spróbuj ponownie.",

      empty:
        "Nie znaleziono pracowników.",

      back:
        "Powrót do administracji",
    },
  }[language];

  useEffect(() => {
    async function loadData() {
      try {
        setError(
          ""
        );

        const data =
          await getAdminTimeReportData();

        setStaffMembers(
          data.staffMembers
        );

        setTimeEntries(
          data.timeEntries
        );
      } catch (
        loadError
      ) {
        console.error(
          "Failed to load admin time reports:",
          loadError
        );

        setError(
          text.error
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadData();
  }, [
    text.error,
  ]);

  const entriesByStaff =
    useMemo(
      () => {
        const groups =
          new Map<
            string,
            TimeEntry[]
          >();

        timeEntries.forEach(
          (
            entry
          ) => {
            const existing =
              groups.get(
                entry.staff
              ) || [];

            existing.push(
              entry
            );

            groups.set(
              entry.staff,
              existing
            );
          }
        );

        return groups;
      },
      [
        timeEntries,
      ]
    );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <div className="mb-6 flex justify-center">

            <img
              src={logo}
              alt="24 Sju"
              className="h-20 w-20 object-contain"
            />

          </div>

          <div className="text-center">

            <div className="mb-3 text-5xl">

              📊

            </div>

            <h1 className="text-3xl font-bold">

              {text.title}

            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-gray-500">

              {text.description}

            </p>

          </div>

          {loading ? (

            <div className="mt-8 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">

              {text.loading}

            </div>

          ) : error ? (

            <div
              role="alert"
              className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
            >

              {error}

            </div>

          ) : staffMembers
            .length === 0 ? (

            <div className="mt-8 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">

              {text.empty}

            </div>

          ) : (

            <>

              <AdminTimeExport
                staffMembers={
                  staffMembers
                }
                timeEntries={
                  timeEntries
                }
                language={
                  language
                }
              />

              <div className="mt-8 space-y-5">

                {staffMembers.map(
                  (
                    staff
                  ) => (

                    <AdminStaffCard
                      key={
                        staff.id
                      }
                      staff={
                        staff
                      }
                      entries={
                        entriesByStaff.get(
                          staff.id
                        ) ?? []
                      }
                      language={
                        language
                      }
                    />

                  )
                )}

              </div>

            </>

          )}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="mt-8 w-full rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300"
          >

            ← {text.back}

          </button>

        </div>

      </div>

    </div>
  );
}

export default StaffTimeReportsPage;