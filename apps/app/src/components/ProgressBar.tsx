import { useTranslation } from "../hooks/useTranslation";

type ProgressBarProps = {
  current: number;
  total: number;
};

function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const { t } = useTranslation();

  const percentage =
    total === 0 ? 0 : (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="w-full rounded-full bg-gray-200 h-3">
        <div
          className="h-3 rounded-full bg-green-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-center text-sm text-gray-500">
        {current} {t.cleaning.progress.of} {total}{" "}
        {t.cleaning.progress.completed}
      </p>
    </div>
  );
}

export default ProgressBar;