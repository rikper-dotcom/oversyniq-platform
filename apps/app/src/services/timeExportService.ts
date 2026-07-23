import type {
  StaffMember,
} from "./adminTimeService";

import type {
  TimeEntry,
} from "./timeService";

type Language =
  | "sv"
  | "en"
  | "pl";

type ExportTimeReportsOptions = {
  staffMembers: StaffMember[];
  timeEntries: TimeEntry[];
  year: number;
  month: number;
  language: Language;
};

type ExportRow = {
  staffName: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  durationMinutes: number;
  manualEntry: string;
  comment: string;
};

function escapeCsvValue(
  value: string | number
) {
  const text =
    String(
      value ?? ""
    );

  return (
    `"${text.replace(
      /"/g,
      '""'
    )}"`
  );
}

function formatDuration(
  minutes: number
) {
  const safeMinutes =
    Math.max(
      0,
      minutes || 0
    );

  const hours =
    Math.floor(
      safeMinutes / 60
    );

  const remainingMinutes =
    safeMinutes % 60;

  return (
    `${hours}:` +
    String(
      remainingMinutes
    ).padStart(
      2,
      "0"
    )
  );
}

function getLocale(
  language: Language
) {
  if (
    language === "sv"
  ) {
    return "sv-SE";
  }

  if (
    language === "pl"
  ) {
    return "pl-PL";
  }

  return "en-GB";
}

function getText(
  language: Language
) {
  return {
    sv: {
      staff:
        "Personal",

      email:
        "E-post",

      date:
        "Datum",

      start:
        "Starttid",

      end:
        "Sluttid",

      duration:
        "Arbetad tid",

      durationMinutes:
        "Minuter",

      manual:
        "Efterregistrerad",

      comment:
        "Kommentar",

      total:
        "TOTALT",

      yes:
        "Ja",

      no:
        "Nej",

      filePrefix:
        "tidsrapporter",
    },

    en: {
      staff:
        "Staff member",

      email:
        "Email",

      date:
        "Date",

      start:
        "Start time",

      end:
        "End time",

      duration:
        "Time worked",

      durationMinutes:
        "Minutes",

      manual:
        "Added manually",

      comment:
        "Comment",

      total:
        "TOTAL",

      yes:
        "Yes",

      no:
        "No",

      filePrefix:
        "time-reports",
    },

    pl: {
      staff:
        "Pracownik",

      email:
        "E-mail",

      date:
        "Data",

      start:
        "Godzina rozpoczęcia",

      end:
        "Godzina zakończenia",

      duration:
        "Czas pracy",

      durationMinutes:
        "Minuty",

      manual:
        "Dodano ręcznie",

      comment:
        "Komentarz",

      total:
        "ŁĄCZNIE",

      yes:
        "Tak",

      no:
        "Nie",

      filePrefix:
        "ewidencja-czasu",
    },
  }[language];
}

export function exportTimeReportsToCsv({
  staffMembers,
  timeEntries,
  year,
  month,
  language,
}: ExportTimeReportsOptions) {
  const locale =
    getLocale(
      language
    );

  const text =
    getText(
      language
    );

  const staffById =
    new Map(
      staffMembers.map(
        (
          staff
        ) => [
          staff.id,
          staff,
        ]
      )
    );

  const filteredEntries =
    timeEntries
      .filter(
        (
          entry
        ) => {
          if (
            entry.status !==
            "completed"
          ) {
            return false;
          }

          const startDate =
            new Date(
              entry.startTime
            );

          return (
            startDate
              .getFullYear() ===
              year &&
            startDate
              .getMonth() ===
              month
          );
        }
      )
      .sort(
        (
          first,
          second
        ) => {
          const firstStaff =
            staffById.get(
              first.staff
            );

          const secondStaff =
            staffById.get(
              second.staff
            );

          const firstName =
            firstStaff?.name ||
            firstStaff?.email ||
            "";

          const secondName =
            secondStaff?.name ||
            secondStaff?.email ||
            "";

          const nameComparison =
            firstName.localeCompare(
              secondName,
              locale
            );

          if (
            nameComparison !==
            0
          ) {
            return nameComparison;
          }

          return (
            new Date(
              first.startTime
            ).getTime() -
            new Date(
              second.startTime
            ).getTime()
          );
        }
      );

  const rows:
    ExportRow[] =
    filteredEntries.map(
      (
        entry
      ) => {
        const staff =
          staffById.get(
            entry.staff
          );

        const startDate =
          new Date(
            entry.startTime
          );

        const endDate =
          new Date(
            entry.endTime
          );

        return {
          staffName:
            staff?.name ||
            staff?.email ||
            entry.staff,

          email:
            staff?.email ||
            "",

          date:
            startDate
              .toLocaleDateString(
                locale
              ),

          startTime:
            startDate
              .toLocaleTimeString(
                locale,
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit",
                }
              ),

          endTime:
            endDate
              .toLocaleTimeString(
                locale,
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit",
                }
              ),

          duration:
            formatDuration(
              entry
                .durationMinutes
            ),

          durationMinutes:
            entry
              .durationMinutes ||
            0,

          manualEntry:
            entry.manualEntry
              ? text.yes
              : text.no,

          comment:
            entry.comment ||
            "",
        };
      }
    );

  const headers = [
    text.staff,
    text.email,
    text.date,
    text.start,
    text.end,
    text.duration,
    text.durationMinutes,
    text.manual,
    text.comment,
  ];

  const csvRows = [
    headers
      .map(
        escapeCsvValue
      )
      .join(";"),
  ];

  let currentStaff =
    "";

  let currentStaffMinutes =
    0;

  rows.forEach(
    (
      row,
      index
    ) => {
      if (
        currentStaff &&
        row.staffName !==
        currentStaff
      ) {
        csvRows.push(
          [
            currentStaff,
            "",
            "",
            "",
            "",
            `${text.total}: ${formatDuration(
              currentStaffMinutes
            )}`,
            currentStaffMinutes,
            "",
            "",
          ]
            .map(
              escapeCsvValue
            )
            .join(";")
        );

        csvRows.push(
          ""
        );

        currentStaffMinutes =
          0;
      }

      currentStaff =
        row.staffName;

      currentStaffMinutes +=
        row.durationMinutes;

      csvRows.push(
        [
          row.staffName,
          row.email,
          row.date,
          row.startTime,
          row.endTime,
          row.duration,
          row.durationMinutes,
          row.manualEntry,
          row.comment,
        ]
          .map(
            escapeCsvValue
          )
          .join(";")
      );

      const isLastRow =
        index ===
        rows.length - 1;

      if (
        isLastRow
      ) {
        csvRows.push(
          [
            currentStaff,
            "",
            "",
            "",
            "",
            `${text.total}: ${formatDuration(
              currentStaffMinutes
            )}`,
            currentStaffMinutes,
            "",
            "",
          ]
            .map(
              escapeCsvValue
            )
            .join(";")
        );
      }
    }
  );

  const csvContent =
    "\uFEFF" +
    csvRows.join(
      "\r\n"
    );

  const blob =
    new Blob(
      [
        csvContent,
      ],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

  const monthNumber =
    String(
      month + 1
    ).padStart(
      2,
      "0"
    );

  const fileName =
    `${text.filePrefix}-` +
    `${year}-` +
    `${monthNumber}.csv`;

  const downloadUrl =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    downloadUrl;

  link.download =
    fileName;

  document.body
    .appendChild(
      link
    );

  link.click();

  document.body
    .removeChild(
      link
    );

  URL.revokeObjectURL(
    downloadUrl
  );
}
