import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  getStoreSettings,
  updateStoreSettings,
  type StoreSettings,
} from "../services/storeSettingsService";

import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";

import StorePreviewCard from "../components/store/StorePreviewCard";
import StoreInformationForm from "../components/store/StoreInformationForm";

function StoreSettingsPage() {
  const [
    settings,
    setSettings,
  ] =
    useState<StoreSettings | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  const [
    success,
    setSuccess,
  ] =
    useState("");

  useEffect(() => {
    async function load() {
      try {
        const record =
          await getStoreSettings();

        setSettings(record);
      } catch (err) {
        console.error(err);

        setError(
          "Kunde inte läsa butikens inställningar."
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  function updateField<
    Key extends keyof StoreSettings
  >(
    key: Key,
    value: StoreSettings[Key]
  ) {
    if (!settings) {
      return;
    }

    setSettings({
      ...settings,
      [key]: value,
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!settings) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updated =
        await updateStoreSettings(
          settings.id,
          settings
        );

      setSettings(updated);

      setSuccess(
        "Butiksinställningarna har sparats."
      );
    } catch (saveError) {
      console.error(saveError);

      setError(
        "Kunde inte spara butiksinställningarna."
      );
    } finally {
      setSaving(false);
    }
  }
    if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Hämtar butiksinställningar...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        icon="🏪"
        title="Butiksinställningar"
        subtitle="Administrera butikens information."
        backTo="/dashboard"
        backLabel="Dashboard"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <StorePreviewCard
          settings={settings}
        />

        <StoreInformationForm
          settings={settings}
          saving={saving}
          error={error}
          success={success}
          updateField={updateField}
          onSubmit={handleSubmit}
        />
      </div>
    </PageLayout>
  );
}

export default StoreSettingsPage;