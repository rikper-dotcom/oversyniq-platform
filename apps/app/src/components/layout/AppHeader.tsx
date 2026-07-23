import StoreName from "../store/StoreName";
import { useStore } from "../../store/StoreProvider";

export default function AppHeader() {
  const { store } = useStore();

  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            🏪 <StoreName />
          </h1>

          <p className="text-gray-500">
            {store?.city}
          </p>

        </div>

      </div>

    </header>
  );
}
