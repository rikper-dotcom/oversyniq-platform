type CleaningTaskProps = {
  task: string;
  completed: boolean;
  onToggle: () => void;
};

function CleaningTask({
  task,
  completed,
  onToggle,
}: CleaningTaskProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <label
        className={`
          flex items-center gap-3 p-4 cursor-pointer transition-colors duration-200
          ${completed ? "bg-green-50" : "hover:bg-gray-50"}
        `}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="w-5 h-5"
        />

        <span
          className={`flex-1 ${
            completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {task}
        </span>
      </label>
    </div>
  );
}

export default CleaningTask;