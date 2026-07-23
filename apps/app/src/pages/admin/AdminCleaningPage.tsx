import { useEffect, useState } from "react";

import Button from "../../components/Button";
import CleaningTaskForm from "../../components/admin/CleaningTaskForm";
import CleaningTaskCard from "../../components/admin/CleaningTaskCard";

import {
  getAllCleaningTasks,
  createCleaningTask,
  updateCleaningTask,
  disableCleaningTask,
  enableCleaningTask,
  moveTaskUp,
  moveTaskDown,
  type CleaningTaskRecord,
} from "../../services/cleaningTaskService";

export default function AdminCleaningPage() {
  const [tasks, setTasks] = useState<CleaningTaskRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] =
    useState<CleaningTaskRecord>();

  const [showInactive, setShowInactive] =
    useState(false);

  async function loadTasks() {
    try {
      const result =
        await getAllCleaningTasks();

      setTasks(result);
    } catch (error) {
      console.error(error);
      alert("Kunde inte hämta städuppgifter.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSave(
    task: Omit<CleaningTaskRecord, "id">
  ) {
    if (editingTask) {
      await updateCleaningTask(
        editingTask.id,
        task
      );
    } else {
      await createCleaningTask(task);
    }

    setEditingTask(undefined);
    setShowForm(false);

    await loadTasks();
  }

  async function handleToggleActive(
    task: CleaningTaskRecord
  ) {
    if (task.active) {
      await disableCleaningTask(task.id);
    } else {
      await enableCleaningTask(task.id);
    }

    await loadTasks();
  }

  async function handleMoveUp(
    task: CleaningTaskRecord
  ) {
    await moveTaskUp(task);
    await loadTasks();
  }

  async function handleMoveDown(
    task: CleaningTaskRecord
  ) {
    await moveTaskDown(task);
    await loadTasks();
  }

  const visibleTasks = showInactive
    ? tasks
    : tasks.filter((t) => t.active);

  if (loading) {
    return (
      <div className="p-8">
        Laddar...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            🧹 Städadministration

          </h1>

          <p className="mt-2 text-gray-500">

            Hantera städuppgifter och deras ordning.

          </p>

        </div>

        {!showForm && (
          <Button
            text="+ Ny uppgift"
            onClick={() => {
              setEditingTask(undefined);
              setShowForm(true);
            }}
          />
        )}

      </div>

      <label className="mb-8 flex items-center gap-3">

        <input
          type="checkbox"
          checked={showInactive}
          onChange={(e) =>
            setShowInactive(
              e.target.checked
            )
          }
        />

        Visa även inaktiva

      </label>

      {showForm && (
        <div className="mb-8">

          <CleaningTaskForm
            initialTask={editingTask}
            onSave={handleSave}
            onCancel={() => {
              setEditingTask(undefined);
              setShowForm(false);
            }}
          />

        </div>
      )}

      <div className="space-y-5">

        {visibleTasks.map((task) => (
          <CleaningTaskCard
            key={task.id}
            task={task}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
            onToggleActive={
              handleToggleActive
            }
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        ))}

      </div>

    </div>
  );
}