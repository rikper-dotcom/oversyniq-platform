import { useEffect, useState } from "react";

import {
  createIncident,
  updateIncident,
  type Incident,
  type IncidentPriority,
} from "../../services/incidentService";

type NewIncidentFormProps = {
  onCreated: () => void;
  incident?: Incident;
};

export default function NewIncidentForm({
  onCreated,
  incident,
}: NewIncidentFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Butik");
  const [priority, setPriority] =
    useState<IncidentPriority>("medium");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!incident) return;

    setTitle(incident.title);
    setCategory(incident.category);
    setPriority(incident.priority);
    setDescription(incident.description);
  }, [incident]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      if (incident?.id) {
        await updateIncident(incident.id, {
          title,
          category,
          priority,
          description,
        });
      } else {
        await createIncident({
          title,
          category,
          priority,
          description,
          status: "open",
          image,
        });

        setTitle("");
        setCategory("Butik");
        setPriority("medium");
        setDescription("");
        setImage(undefined);
      }

      onCreated();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          Rubrik
        </label>

        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Kategori
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option>Temperatur</option>
          <option>Butik</option>
          <option>Städning</option>
          <option>Leverans</option>
          <option>El</option>
          <option>Säkerhet</option>
          <option>Annat</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Prioritet
        </label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as IncidentPriority
            )
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="low">Låg</option>
          <option value="medium">Medel</option>
          <option value="high">Hög</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Beskrivning
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      {!incident && (
        <div>
          <label className="mb-2 block font-medium">
            Bild (valfri)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] ?? undefined
              )
            }
            className="block w-full rounded-xl border p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        </div>
      )}

      <button
        disabled={saving}
        className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white disabled:opacity-50"
      >
        {saving
          ? "Sparar..."
          : incident
          ? "Spara ändringar"
          : "Skapa incident"}
      </button>
    </form>
  );
}