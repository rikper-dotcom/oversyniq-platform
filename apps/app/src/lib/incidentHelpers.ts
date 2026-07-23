export function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return {
        label: "Hög",
        className:
          "bg-red-100 text-red-700 border border-red-200",
      };

    case "medium":
      return {
        label: "Medel",
        className:
          "bg-yellow-100 text-yellow-700 border border-yellow-200",
      };

    case "low":
      return {
        label: "Låg",
        className:
          "bg-green-100 text-green-700 border border-green-200",
      };

    default:
      return {
        label: priority,
        className:
          "bg-gray-100 text-gray-700 border border-gray-200",
      };
  }
}

export function getStatusBadge(status: string) {
  switch (status) {
    case "open":
      return {
        label: "Öppen",
        className:
          "bg-blue-100 text-blue-700 border border-blue-200",
      };

    case "in_progress":
      return {
        label: "Pågående",
        className:
          "bg-orange-100 text-orange-700 border border-orange-200",
      };

    case "resolved":
      return {
        label: "Löst",
        className:
          "bg-green-100 text-green-700 border border-green-200",
      };

    default:
      return {
        label: status,
        className:
          "bg-gray-100 text-gray-700 border border-gray-200",
      };
  }
}

export function getCategoryBadge(category: string) {
  switch (category) {
    case "Temperatur":
      return {
        icon: "🌡",
        className:
          "bg-red-100 text-red-700 border border-red-200",
      };

    case "Varor":
      return {
        icon: "🛒",
        className:
          "bg-blue-100 text-blue-700 border border-blue-200",
      };

    case "Butik":
      return {
        icon: "🏪",
        className:
          "bg-gray-100 text-gray-700 border border-gray-200",
      };

    case "Städning":
      return {
        icon: "🧹",
        className:
          "bg-purple-100 text-purple-700 border border-purple-200",
      };

    case "Leverans":
      return {
        icon: "📦",
        className:
          "bg-cyan-100 text-cyan-700 border border-cyan-200",
      };

    case "El":
      return {
        icon: "⚡",
        className:
          "bg-yellow-100 text-yellow-700 border border-yellow-200",
      };

    default:
      return {
        icon: "📌",
        className:
          "bg-gray-100 text-gray-700 border border-gray-200",
      };
  }
}
