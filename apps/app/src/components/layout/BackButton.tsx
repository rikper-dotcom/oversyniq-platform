import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  to?: string;
  label?: string;
};

export default function BackButton({
  to = "/dashboard",
  label = "Dashboard",
}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
    >
      <span>←</span>
      <span>{label}</span>
    </button>
  );
}
