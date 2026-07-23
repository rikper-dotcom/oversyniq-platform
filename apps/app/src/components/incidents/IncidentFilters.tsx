type IncidentFiltersProps = {
  search: string;
  status: string;
  showStatusFilter?: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export default function IncidentFilters({
  search,
  status,
  showStatusFilter = true,
  onSearchChange,
  onStatusChange,
}: IncidentFiltersProps) {
  return (
    <div
      className={
        showStatusFilter
          ? "mb-6 grid gap-4 md:grid-cols-2"
          : "mb-6"
      }
    >
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="🔍 Sök incident..."
        className="rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
      />

      {showStatusFilter && (
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Alla statusar</option>
          <option value="open">Öppna</option>
          <option value="in_progress">Pågående</option>
          <option value="resolved">Lösta</option>
        </select>
      )}
    </div>
  );
}