import pb from "./pocketbase";

export type StoreSettings = {
  id: string;

  storeId: string;

  storeName: string;

  brandName: string;

  organizationNumber: string;

  vatNumber: string;

  address: string;

  postalCode: string;

  city: string;

  country: string;

  phone: string;

  email: string;

  currency: string;

  timezone: string;

  defaultLanguage: string;

  primaryColor: string;

  secondaryColor: string;

  logo?: string;
};

export async function getStoreSettings() {
  const records =
    await pb
      .collection("store_settings")
      .getFullList({
        sort: "created",
        requestKey: null,
      });

  if (records.length === 0) {
    throw new Error(
      "No store settings found."
    );
  }

  return records[0] as unknown as StoreSettings;
}

export async function updateStoreSettings(
  id: string,
  data: Partial<StoreSettings>
) {
  const record =
    await pb
      .collection("store_settings")
      .update(id, data, {
        requestKey: null,
      });

  return record as unknown as StoreSettings;
}