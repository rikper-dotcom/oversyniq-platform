import {
  useState,
} from "react";

import type {
  StaffMember,
} from "../../services/adminTimeService";

import type {
  TimeEntry,
} from "../../services/timeService";

import AdminStaffHeader from "./AdminStaffHeader";
import AdminStaffTimeHistory from "./AdminStaffTimeHistory";

type Language =
  | "sv"
  | "en"
  | "pl";

type AdminStaffCardProps = {
  staff: StaffMember;
  entries: TimeEntry[];
  language: Language;
};

function AdminStaffCard({
  staff,
  entries,
  language,
}: AdminStaffCardProps) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const totalMinutes =
    entries.reduce(
      (
        total,
        entry
      ) =>
        total +
        (
          entry.durationMinutes ??
          0
        ),
      0
    );

  const manualCount =
    entries.filter(
      (
        entry
      ) =>
        entry.manualEntry
    ).length;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200">

      <AdminStaffHeader
        staff={staff}
        totalMinutes={totalMinutes}
        shiftCount={entries.length}
        manualCount={manualCount}
        language={language}
        open={open}
        onToggle={() =>
          setOpen(
            !open
          )
        }
      />

      {open && (

        <div className="border-t border-gray-200 bg-gray-50 p-4">

          <AdminStaffTimeHistory
            entries={entries}
            language={language}
          />

        </div>

      )}

    </article>
  );
}

export default AdminStaffCard;