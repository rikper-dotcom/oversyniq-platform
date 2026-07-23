import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import CleaningTask from "../components/CleaningTask";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";

import { getWeekNumber } from "../utils/date";

import {
  saveCleaningSession,
} from "../services/cleaningService";

import {
  getTasksForWeek,
} from "../services/cleaningTaskService";

import type {
  CleaningTask as CleaningTaskType,
} from "../services/cleaningTaskService";

import {
  useLanguage,
} from "../context/LanguageContext";

import {
  useTranslation,
} from "../hooks/useTranslation";

function CleaningPage() {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const { t } = useTranslation();

  const currentWeek = getWeekNumber(
    new Date()
  );

  const [tasks, setTasks] = useState<
    CleaningTaskType[]
  >([]);

  const [
    completedTasks,
    setCompletedTasks,
  ] = useState<
    Record<string, boolean>
  >({});

  const [
    cleanerName,
    setCleanerName,
  ] = useState("");

  const [
    comment,
    setComment,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const loadedTasks =
          await getTasksForWeek();

        setTasks(loadedTasks);

        const initialTasks: Record<
          string,
          boolean
        > = {};

        loadedTasks.forEach((task) => {
          initialTasks[task.id] = false;
        });

        setCompletedTasks(initialTasks);
      } catch (error) {
        console.error(error);

        alert(
          "Kunde inte läsa städuppgifter."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const completedCount =
    Object.values(
      completedTasks
    ).filter(Boolean).length;

  function toggleTask(
    taskId: string
  ) {
    setCompletedTasks({
      ...completedTasks,
      [taskId]:
        !completedTasks[taskId],
    });
  }

  async function registerCleaning() {
    const missing =
      tasks.length -
      completedCount;

    if (missing > 0) {
      const ok =
        window.confirm(
          `${missing} ${t.cleaning.incompleteWarning}`
        );

      if (!ok) {
        return;
      }
    }

    try {
      setSaving(true);

      await saveCleaningSession({
        cleanerName,
        completedAt:
          new Date().toISOString(),
        week:
          currentWeek,
        comment,
        tasks:
          completedTasks,
        completed:
          missing === 0,
        store:
          "24 Sju Hjärtum",
        language,
        completedCount,
        totalTasks:
          tasks.length,
      });

      alert(
        `✅ ${t.cleaning.saveSuccess}`
      );

      setCleanerName("");
      setComment("");

      const resetTasks: Record<
        string,
        boolean
      > = {};

      tasks.forEach((task) => {
        resetTasks[task.id] = false;
      });

      setCompletedTasks(
        resetTasks
      );
    } catch (error) {
      console.error(error);

      alert(
        `❌ ${t.cleaning.saveError}`
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Laddar...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl bg-gray-200 px-4 py-2 hover:bg-gray-300 transition"
          >
            ← Tillbaka
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="24 Sju"
            className="w-24 h-24"
          />
        </div>

        <h1 className="text-2xl font-bold text-center">
          {t.cleaning.title}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          {t.cleaning.week}{" "}
          {currentWeek}
        </p>

        <div className="mb-6">
          <label className="block font-medium mb-2">
            {
              t.cleaning
                .cleanerQuestion
            }
          </label>

          <input
            type="text"
            value={cleanerName}
            onChange={(event) =>
              setCleanerName(
                event.target.value
              )
            }
            placeholder={
              t.cleaning
                .namePlaceholder
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <ProgressBar
          current={completedCount}
          total={tasks.length}
        />

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          {tasks.map((task) => (
            <CleaningTask
              key={task.id}
              task={
                task.labels[
                  language
                ]
              }
              completed={
                completedTasks[
                  task.id
                ]
              }
              onToggle={() =>
                toggleTask(
                  task.id
                )
              }
            />
          ))}
        </div>

        <div className="mb-8">
          <label className="block font-medium mb-2">
            {
              t.cleaning
                .comment
            }
          </label>

          <textarea
            rows={4}
            value={comment}
            onChange={(event) =>
              setComment(
                event.target.value
              )
            }
            placeholder={
              t.cleaning
                .commentPlaceholder
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <Button
          text={
            saving
              ? t.cleaning
                  .saving
              : `✅ ${t.cleaning.register}`
          }
          onClick={
            registerCleaning
          }
          disabled={
            cleanerName.trim() ===
              "" || saving
          }
        />
      </div>
    </div>
  );
}

export default CleaningPage;