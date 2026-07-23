import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getStoreSettings,
  type StoreSettings,
} from "../services/storeSettingsService";

type StoreContextType = {
  store: StoreSettings | null;
  loading: boolean;
  reload: () => Promise<void>;
};

const StoreContext =
  createContext<StoreContextType | null>(
    null
  );

export function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    store,
    setStore,
  ] =
    useState<StoreSettings | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  async function reload() {
    try {
      const data =
        await getStoreSettings();

      setStore(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        loading,
        reload,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}
