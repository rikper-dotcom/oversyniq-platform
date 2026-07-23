import type {
  StaffMember,
} from "../../services/adminTimeService";

type Language =
  | "sv"
  | "en"
  | "pl";

type AdminStaffHeaderProps = {
  staff: StaffMember;
  totalMinutes: number;
  shiftCount: number;
  manualCount: number;
  language: Language;
  open: boolean;
  onToggle: () => void;
};

function AdminStaffHeader({
  staff,
  totalMinutes,
  shiftCount,
  manualCount,
  language,
  open,
  onToggle,
}: AdminStaffHeaderProps) {
  const text = {
    sv: {
      admin: "Administratör",
      employee: "Personal",
      totalTime: "Total tid",
      workShifts: "Arbetspass",
      manual: "Efterregistrerade",
      show: "Visa historik",
      hide: "Dölj historik",
    },

    en: {
      admin: "Administrator",
      employee: "Staff",
      totalTime: "Total time",
      workShifts: "Work shifts",
      manual: "Added manually",
      show: "Show history",
      hide: "Hide history",
    },

    pl: {
      admin: "Administrator",
      employee: "Personel",
      totalTime: "Łączny czas",
      workShifts: "Zmiany",
      manual: "Dodane ręcznie",
      show: "Pokaż historię",
      hide: "Ukryj historię",
    },
  }[language];

  function formatDuration(
    minutes: number
  ) {
    const hours =
      Math.floor(
        minutes / 60
      );

    const mins =
      minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    return `${hours} h ${mins} min`;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full bg-white p-5 text-left transition hover:bg-gray-50"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-2">

            <h2 className="text-xl font-bold">
              {staff.name ||
                staff.email}
            </h2>

            <span
              className={
                staff.role ===
                "admin"
                  ? "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                  : "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
              }
            >
              {staff.role ===
              "admin"
                ? text.admin
                : text.employee}
            </span>

          </div>

          <p className="mt-1 text-sm text-gray-500">
            {staff.email}
          </p>

          <p className="mt-3 text-sm font-medium text-gray-600">
            {open
              ? text.hide
              : text.show}
          </p>

        </div>

        <div className="grid grid-cols-3 gap-3">

          <div className="rounded-xl bg-green-50 p-3 text-center">

            <p className="text-xs text-gray-500">
              {text.totalTime}
            </p>

            <p className="mt-1 font-bold text-green-700">
              {formatDuration(
                totalMinutes
              )}
            </p>

          </div>

          <div className="rounded-xl bg-gray-100 p-3 text-center">

            <p className="text-xs text-gray-500">
              {text.workShifts}
            </p>

            <p className="mt-1 text-lg font-bold">
              {shiftCount}
            </p>

          </div>

          <div className="rounded-xl bg-blue-50 p-3 text-center">

            <p className="text-xs text-gray-500">
              {text.manual}
            </p>

            <p className="mt-1 text-lg font-bold text-blue-700">
              {manualCount}
            </p>

          </div>

        </div>

      </div>
    </button>
  );
}

export default AdminStaffHeader;
