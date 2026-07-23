import type { CleaningTaskRecord } from "../../services/cleaningTaskService";

type Props = {
  task: CleaningTaskRecord;
  onEdit: (task: CleaningTaskRecord) => void;
  onToggleActive: (task: CleaningTaskRecord) => void;
  onMoveUp: (task: CleaningTaskRecord) => void;
  onMoveDown: (task: CleaningTaskRecord) => void;
};

function getFrequencyText(
  frequency: CleaningTaskRecord["frequency"]
) {
  switch (frequency) {
    case "daily":
      return "Varje dag";

    case "weekly":
      return "Varje vecka";

    case "biweekly":
      return "Varannan vecka";

    case "monthly":
      return "Varje månad";

    default:
      return frequency;
  }
}

export default function CleaningTaskCard({
  task,
  onEdit,
  onToggleActive,
  onMoveUp,
  onMoveDown,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold">
            🧹 {task.title_sv}
          </h3>

          <p className="mt-2 text-gray-500">
            📅 {getFrequencyText(task.frequency)}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            task.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {task.active ? "🟢 Aktiv" : "🔴 Inaktiv"}
        </span>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex gap-3">

          <button
            type="button"
            title="Flytta upp"
            onClick={() => onMoveUp(task)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-300 bg-green-50 text-green-700 transition hover:bg-green-100"
          >
            ▲
          </button>

          <button
            type="button"
            title="Flytta ned"
            onClick={() => onMoveDown(task)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-red-700 transition hover:bg-red-100"
          >
            ▼
          </button>

        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            ✏️ Redigera
          </button>

          <button
            type="button"
            onClick={() => onToggleActive(task)}
            className={`rounded-lg px-4 py-2 font-medium text-white transition ${
              task.active
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {task.active ? "Inaktivera" : "Aktivera"}
          </button>

        </div>

      </div>

    </div>
  );
}