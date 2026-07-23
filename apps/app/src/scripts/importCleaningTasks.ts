import pb from "../services/pocketbase";
import {
  weeklyTasks,
  biWeeklyTasks,
} from "../data/cleaningTasks";

async function importTasks() {
  const tasks = [
    ...weeklyTasks.map((task, index) => ({
      ...task,
      frequency: "weekly",
      sortOrder: (index + 1) * 10,
    })),

    ...biWeeklyTasks.map((task, index) => ({
      ...task,
      frequency: "biweekly",
      sortOrder: (weeklyTasks.length + index + 1) * 10,
    })),
  ];

  for (const task of tasks) {
    const existing = await pb
      .collection("cleaning_tasks")
      .getFirstListItem(`id = "${task.id}"`)
      .catch(() => null);

    if (existing) {
      console.log(`✓ ${task.id} finns redan`);
      continue;
    }

    await pb.collection("cleaning_tasks").create({
      id: task.id,
      title_sv: task.labels.sv,
      title_en: task.labels.en,
      title_pl: task.labels.pl,
      frequency: task.frequency,
      active: true,
      sortOrder: task.sortOrder,
    });

    console.log(`Importerade ${task.id}`);
  }

  console.log("✅ Klar!");
}

importTasks().catch(console.error);
