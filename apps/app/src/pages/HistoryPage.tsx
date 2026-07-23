import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  weeklyTasks,
  biWeeklyTasks,
} from "../data/cleaningTasks";

import { getCleaningSessions } from "../services/cleaningService";

type CleaningSession = {
  id: string;
  cleanerName: string;
  completedAt: string;
  week: number;
  comment?: string;
  tasks?: Record<string, boolean>;
  completed?: boolean;
  store?: string;
  language?: string;
  completedCount?: number;
  totalTasks?: number;
};

const allTasks = [
  ...weeklyTasks,
  ...biWeeklyTasks,
];

function getTaskLabel(
  taskId: string,
  language: string = "sv"
) {
  const task = allTasks.find(
    (t) => t.id === taskId
  );

  if (!task) {
    return taskId;
  }

  return (
    task.labels[
      language as "sv" | "en" | "pl"
    ] ?? task.labels.sv
  );
}

export default function HistoryPage() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<CleaningSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadSessions() {
      try {
        const data = await getCleaningSessions();
        setSessions(data.map((item) => item as unknown as CleaningSession));
      } catch (err) {
        console.error("Failed to load cleaning history:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSessions();
  }, []);

  function toggle(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  }

  function getCompleted(session: CleaningSession) {
    if (session.completedCount !== undefined) {
      return session.completedCount;
    }

    return Object.values(session.tasks ?? {}).filter(Boolean).length;
  }

  function getTotal(session: CleaningSession) {
    if (session.totalTasks !== undefined) {
      return session.totalTasks;
    }

    return Object.keys(session.tasks ?? {}).length;
  }

  function getPercent(session: CleaningSession) {
    const total = getTotal(session);

    if (total === 0) return 0;

    return Math.round((getCompleted(session) / total) * 100);
  }

  function statusColor(percent: number) {
    if (percent >= 100) return "text-green-600";
    if (percent >= 80) return "text-yellow-500";
    return "text-red-500";
  }

  function statusEmoji(percent: number) {
    if (percent >= 100) return "🟢";
    if (percent >= 80) return "🟡";
    return "🔴";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          Laddar historik...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              📜 Städhistorik
            </h1>

            <p className="text-gray-500">
              Totalt {sessions.length} registreringar
            </p>

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-gray-200 px-5 py-3 hover:bg-gray-300 transition"
          >
            ← Tillbaka
          </button>

        </div>

        {sessions.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">
            Ingen historik finns ännu.
          </div>

        ) : (

          sessions.map((session) => {

            const completed = getCompleted(session);
            const total = getTotal(session);
            const percent = getPercent(session);

            return (

              <div
                key={session.id}
                className="bg-white rounded-2xl shadow-lg mb-5 overflow-hidden"
              >

                <div className="p-6">

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-bold">
                        🧹 {session.cleanerName}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        📅 {new Date(session.completedAt).toLocaleString("sv-SE")}
                      </p>

                      <p className="text-gray-500">
                        📆 Vecka {session.week}
                      </p>

                      <p className="text-gray-500">
                        🏪 {session.store || "24 Sju Hjärtum"}
                      </p>

                      <p className="text-gray-500">
                        🌍 {(session.language || "sv").toUpperCase()}
                      </p>

                    </div>

                    <div className="text-right">

                      <div
                        className={`text-3xl font-bold ${statusColor(percent)}`}
                      >
                        {statusEmoji(percent)} {percent}%
                      </div>

                      <div className="text-gray-500">
                        {completed} / {total}
                      </div>

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="w-full h-4 rounded-full bg-gray-200">

                      <div
                        className="h-4 rounded-full bg-green-600 transition-all"
                        style={{
                          width: `${percent}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="mt-6 flex justify-between items-center">

                    <div>

                      {session.comment && (

                        <div className="text-gray-700">
                          💬 {session.comment}
                        </div>

                      )}

                    </div>

                    <button
                      onClick={() => toggle(session.id)}
                      className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                    >
                      {expandedId === session.id
                        ? "▲ Dölj detaljer"
                        : "👁 Visa detaljer"}
                    </button>

                  </div>

                </div>

                {expandedId === session.id && (

                  <div className="border-t bg-gray-50 p-6">

                    <h3 className="text-lg font-semibold mb-4">
                      Städchecklista
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3">

                      {Object.entries(session.tasks ?? {}).map(
                        ([task, completed]) => (

                          <div
                            key={task}
                            className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
                          >
                            <span className="text-xl">
                              {completed ? "✅" : "❌"}
                            </span>

                            <span>
                              {getTaskLabel(
                                task,
                                session.language || "sv"
                              )}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                    {session.comment && (

                      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">

                        <h4 className="font-semibold mb-2">
                          Kommentar
                        </h4>

                        <p className="text-gray-700">
                          {session.comment}
                        </p>

                      </div>

                    )}

                  </div>

                )}

              </div>

            );

          })

        )}

      </div>

    </div>
  );
}