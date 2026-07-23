import { useState } from "react";

import Button from "../Button";

import type {
  CleaningTaskRecord,
} from "../../services/cleaningTaskService";

type Props = {
  initialTask?: CleaningTaskRecord;
  onSave: (
    task: Omit<CleaningTaskRecord, "id">
  ) => Promise<void>;
  onCancel: () => void;
};

function CleaningTaskForm({
  initialTask,
  onSave,
  onCancel,
}: Props) {
  const [titleSv, setTitleSv] = useState(
    initialTask?.title_sv ?? ""
  );

  const [titleEn, setTitleEn] = useState(
    initialTask?.title_en ?? ""
  );

  const [titlePl, setTitlePl] = useState(
    initialTask?.title_pl ?? ""
  );

  const [frequency, setFrequency] = useState<
    CleaningTaskRecord["frequency"]
  >(initialTask?.frequency ?? "weekly");

  const [sortOrder, setSortOrder] = useState(
    initialTask?.sortOrder ?? 10
  );

  const [active, setActive] = useState(
    initialTask?.active ?? true
  );

  const [saving, setSaving] = useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSaving(true);

    try {
      await onSave({
        title_sv: titleSv.trim(),
        title_en: titleEn.trim(),
        title_pl: titlePl.trim(),
        frequency,
        sortOrder,
        active,
      });

      onCancel();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold">
        {initialTask
          ? "Redigera städuppgift"
          : "Ny städuppgift"}
      </h2>

      <div>
        <label className="block mb-1 font-medium">
          Svenska
        </label>

        <input
          className="w-full rounded-lg border p-3"
          value={titleSv}
          onChange={(e) =>
            setTitleSv(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Engelska
        </label>

        <input
          className="w-full rounded-lg border p-3"
          value={titleEn}
          onChange={(e) =>
            setTitleEn(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Polska
        </label>

        <input
          className="w-full rounded-lg border p-3"
          value={titlePl}
          onChange={(e) =>
            setTitlePl(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Frekvens
        </label>

        <select
          className="w-full rounded-lg border p-3"
          value={frequency}
          onChange={(e) =>
            setFrequency(
              e.target.value as CleaningTaskRecord["frequency"]
            )
          }
        >
          <option value="daily">
            Dagligen
          </option>

          <option value="weekly">
            Varje vecka
          </option>

          <option value="biweekly">
            Varannan vecka
          </option>

          <option value="monthly">
            Varje månad
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Sorteringsordning
        </label>

        <input
          type="number"
          className="w-full rounded-lg border p-3"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              Number(e.target.value)
            )
          }
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) =>
            setActive(e.target.checked)
          }
        />

        Aktiv
      </label>

      <div className="flex gap-3">

        <Button
          text={
            saving
              ? "Sparar..."
              : "Spara"
          }
          onClick={() => {}}
        />

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-gray-300 px-5 py-3 hover:bg-gray-400"
        >
          Avbryt
        </button>

      </div>
    </form>
  );
}

export default CleaningTaskForm;
