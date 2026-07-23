import type { FormEvent } from "react";

import Button from "../Button";

import type { StoreSettings } from "../../services/storeSettingsService";

type Props = {
  settings: StoreSettings;
  saving: boolean;
  error: string;
  success: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  updateField: <Key extends keyof StoreSettings>(
    key: Key,
    value: StoreSettings[Key]
  ) => void;
};

export default function StoreInformationForm({
  settings,
  saving,
  error,
  success,
  onSubmit,
  updateField,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold">
        ⚙️ Butiksinformation
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <label>
            <span className="mb-2 block font-medium">
              Butiksnamn
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.storeName}
              onChange={(e) =>
                updateField(
                  "storeName",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Varumärke
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.brandName}
              onChange={(e) =>
                updateField(
                  "brandName",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Organisationsnummer
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.organizationNumber}
              onChange={(e) =>
                updateField(
                  "organizationNumber",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Momsnummer
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.vatNumber}
              onChange={(e) =>
                updateField(
                  "vatNumber",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Telefon
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              E-post
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block font-medium">
              Adress
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Postnummer
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.postalCode}
              onChange={(e) =>
                updateField(
                  "postalCode",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Stad
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.city}
              onChange={(e) =>
                updateField(
                  "city",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Land
            </span>

            <input
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.country}
              onChange={(e) =>
                updateField(
                  "country",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Valuta
            </span>

            <select
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.currency}
              onChange={(e) =>
                updateField(
                  "currency",
                  e.target.value
                )
              }
            >
              <option value="SEK">SEK</option>
              <option value="NOK">NOK</option>
              <option value="DKK">DKK</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Tidszon
            </span>

            <select
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.timezone}
              onChange={(e) =>
                updateField(
                  "timezone",
                  e.target.value
                )
              }
            >
              <option value="Europe/Stockholm">Stockholm</option>
              <option value="Europe/Oslo">Oslo</option>
              <option value="Europe/Copenhagen">Köpenhamn</option>
              <option value="Europe/London">London</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Standardspråk
            </span>

            <select
              className="w-full rounded-xl border border-gray-300 p-3"
              value={settings.defaultLanguage}
              onChange={(e) =>
                updateField(
                  "defaultLanguage",
                  e.target.value
                )
              }
            >
              <option value="sv">🇸🇪 Svenska</option>
              <option value="en">🇬🇧 English</option>
              <option value="pl">🇵🇱 Polski</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Primär färg
            </span>

            <input
              type="color"
              className="h-12 w-full rounded-xl border"
              value={settings.primaryColor}
              onChange={(e) =>
                updateField(
                  "primaryColor",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block font-medium">
              Sekundär färg
            </span>

            <input
              type="color"
              className="h-12 w-full rounded-xl border"
              value={settings.secondaryColor}
              onChange={(e) =>
                updateField(
                  "secondaryColor",
                  e.target.value
                )
              }
            />
          </label>

        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            ✓ {success}
          </div>
        )}

        <Button
          text={saving ? "Sparar..." : "Spara inställningar"}
          type="submit"
          disabled={saving}
          fullWidth
        />

      </form>

    </section>
  );
}
