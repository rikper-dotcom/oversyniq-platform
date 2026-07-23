import PocketBase from "pocketbase";
import { weeklyTasks, biWeeklyTasks } from "../data/cleaningTasks";

const pb = new PocketBase("http://127.0.0.1:8090");

async function seedCleaningTasks() {
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

  const existing = await pb
    .collection("cleaning_tasks")
    .getFullList();

  for (const task of tasks) {
    const exists = existing.find(
      (record: any) => record.title_sv === task.labels.sv
    );

    if (exists) {
      console.log(`✓ Finns redan: ${task.labels.sv}`);
      continue;
    }

    await pb.collection("cleaning_tasks").create({
      title_sv: task.labels.sv,
      title_en: task.labels.en,
      title_pl: task.labels.pl,
      frequency: task.frequency,
      active: true,
      sortOrder: task.sortOrder,
      category: "cleaning",
    });

    console.log(`+ Importerad: ${task.labels.sv}`);
  }

  console.log("\n✅ Städlistan importerad.");
}

seedCleaningTasks().catch((err) => {
  console.error(err);
});