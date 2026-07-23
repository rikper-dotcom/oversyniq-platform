import StoreLogo from "./StoreLogo";

import type { StoreSettings } from "../../services/storeSettingsService";

type StorePreviewCardProps = {
  settings: StoreSettings;
};

export default function StorePreviewCard({
  settings,
}: StorePreviewCardProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold">
        🏪 Förhandsvisning
      </h2>

      <div
        className="overflow-hidden rounded-3xl border shadow-lg"
        style={{
          background:
            settings.secondaryColor || "#F3F4F6",
        }}
      >

        <div
          className="p-8 text-white"
          style={{
            background:
              settings.primaryColor || "#2563EB",
          }}
        >

          <div className="flex items-center gap-4">

            <StoreLogo className="h-16 w-16 rounded-xl bg-white p-2" />

            <div>

              <h3 className="text-2xl font-bold">
                {settings.storeName}
              </h3>

              <p className="opacity-90">
                {settings.brandName}
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-4 p-8">

          <div>

            <div className="text-sm text-gray-500">
              📍 Adress
            </div>

            <div className="font-medium">
              {settings.address}
              <br />
              {settings.postalCode} {settings.city}
            </div>

          </div>

          <div>

            <div className="text-sm text-gray-500">
              ☎ Telefon
            </div>

            <div className="font-medium">
              {settings.phone}
            </div>

          </div>

          <div>

            <div className="text-sm text-gray-500">
              ✉ E-post
            </div>

            <div className="font-medium">
              {settings.email}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <div className="text-sm text-gray-500">
                Valuta
              </div>

              <div className="font-medium">
                {settings.currency}
              </div>

            </div>

            <div>

              <div className="text-sm text-gray-500">
                Tidszon
              </div>

              <div className="font-medium">
                {settings.timezone}
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
