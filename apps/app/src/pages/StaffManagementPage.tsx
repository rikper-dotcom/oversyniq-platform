import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

import {
  useLanguage,
} from "../context/LanguageContext";

import {
  createStaffMember,
  getStaffMembers,
  updateStaffMember,
  type StaffLanguage,
  type StaffMember,
  type StaffRole,
} from "../services/staffAdminService";

type StaffFormData = {
  name: string;
  displayName: string;
  email: string;
  phone: string;
  language: StaffLanguage;
  role: StaffRole;
  active: boolean;
  password: string;
  passwordConfirm: string;
};

const emptyForm: StaffFormData = {
  name: "",
  displayName: "",
  email: "",
  phone: "",
  language: "sv",
  role: "employee",
  active: true,
  password: "",
  passwordConfirm: "",
};

function StaffManagementPage() {
  const navigate =
    useNavigate();

  const {
    language,
  } = useLanguage();

  const [
    staffMembers,
    setStaffMembers,
  ] = useState<
    StaffMember[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    loadError,
    setLoadError,
  ] = useState(
    ""
  );

  const [
    showForm,
    setShowForm,
  ] = useState(
    false
  );

  const [
    editingStaff,
    setEditingStaff,
  ] = useState<
    StaffMember | null
  >(
    null
  );

  const [
    form,
    setForm,
  ] = useState<
    StaffFormData
  >(
    emptyForm
  );

  const [
    saving,
    setSaving,
  ] = useState(
    false
  );

  const [
    formError,
    setFormError,
  ] = useState(
    ""
  );

  const [
    successMessage,
    setSuccessMessage,
  ] = useState(
    ""
  );
  const text = {
    sv: {
      title:
        "Personal",

      description:
        "Lägg till och hantera personalens konton.",

      back:
        "Tillbaka till dashboard",

      addStaff:
        "Lägg till personal",

      editStaff:
        "Redigera personal",

      fullName:
        "Fullständigt namn",

      displayName:
        "Visningsnamn",

      email:
        "E-postadress",

      phone:
        "Telefonnummer",

      language:
        "Språk",

      role:
        "Roll",

      admin:
        "Administratör",

      employee:
        "Personal",

      active:
        "Aktiv",

      inactive:
        "Inaktiv",

      password:
        "Lösenord",

      passwordConfirm:
        "Bekräfta lösenord",

      passwordHelp:
        "Lösenordet måste innehålla minst 8 tecken.",

      save:
        "Spara",

      saving:
        "Sparar...",

      cancel:
        "Avbryt",

      edit:
        "Redigera",

      loading:
        "Hämtar personal...",

      noStaff:
        "Ingen personal hittades.",

      loadError:
        "Personalen kunde inte hämtas.",

      passwordMismatch:
        "Lösenorden är inte identiska.",

      passwordLength:
        "Lösenordet måste innehålla minst 8 tecken.",

      formError:
        "Uppgifterna kunde inte sparas. Kontrollera formuläret och försök igen.",

      created:
        "Personalkontot har skapats.",

      updated:
        "Personalkontot har uppdaterats.",

      swedish:
        "Svenska",

      english:
        "English",

      polish:
        "Polski",
    },

    en: {
      title:
        "Staff",

      description:
        "Add and manage staff accounts.",

      back:
        "Back to dashboard",

      addStaff:
        "Add staff member",

      editStaff:
        "Edit staff member",

      fullName:
        "Full name",

      displayName:
        "Display name",

      email:
        "Email address",

      phone:
        "Phone number",

      language:
        "Language",

      role:
        "Role",

      admin:
        "Administrator",

      employee:
        "Staff",

      active:
        "Active",

      inactive:
        "Inactive",

      password:
        "Password",

      passwordConfirm:
        "Confirm password",

      passwordHelp:
        "The password must contain at least 8 characters.",

      save:
        "Save",

      saving:
        "Saving...",

      cancel:
        "Cancel",

      edit:
        "Edit",

      loading:
        "Loading staff...",

      noStaff:
        "No staff members were found.",

      loadError:
        "The staff list could not be loaded.",

      passwordMismatch:
        "The passwords do not match.",

      passwordLength:
        "The password must contain at least 8 characters.",

      formError:
        "The information could not be saved. Check the form and try again.",

      created:
        "The staff account has been created.",

      updated:
        "The staff account has been updated.",

      swedish:
        "Svenska",

      english:
        "English",

      polish:
        "Polski",
    },

    pl: {
      title:
        "Personel",

      description:
        "Dodawaj konta pracowników i zarządzaj nimi.",

      back:
        "Powrót do panelu",

      addStaff:
        "Dodaj pracownika",

      editStaff:
        "Edytuj pracownika",

      fullName:
        "Imię i nazwisko",

      displayName:
        "Nazwa wyświetlana",

      email:
        "Adres e-mail",

      phone:
        "Numer telefonu",

      language:
        "Język",

      role:
        "Rola",

      admin:
        "Administrator",

      employee:
        "Personel",

      active:
        "Aktywny",

      inactive:
        "Nieaktywny",

      password:
        "Hasło",

      passwordConfirm:
        "Potwierdź hasło",

      passwordHelp:
        "Hasło musi zawierać co najmniej 8 znaków.",

      save:
        "Zapisz",

      saving:
        "Zapisywanie...",

      cancel:
        "Anuluj",

      edit:
        "Edytuj",

      loading:
        "Pobieranie personelu...",

      noStaff:
        "Nie znaleziono pracowników.",

      loadError:
        "Nie udało się pobrać listy personelu.",

      passwordMismatch:
        "Hasła nie są identyczne.",

      passwordLength:
        "Hasło musi zawierać co najmniej 8 znaków.",

      formError:
        "Nie udało się zapisać danych. Sprawdź formularz i spróbuj ponownie.",

      created:
        "Konto pracownika zostało utworzone.",

      updated:
        "Konto pracownika zostało zaktualizowane.",

      swedish:
        "Svenska",

      english:
        "English",

      polish:
        "Polski",
    },
  }[language];
  async function loadStaff() {
    setLoading(
      true
    );

    setLoadError(
      ""
    );

    try {
      const records =
        await getStaffMembers();

      setStaffMembers(
        records
      );
    } catch (
      error
    ) {
      console.error(
        "Failed to load staff:",
        error
      );

      setLoadError(
        text.loadError
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  useEffect(
    () => {
      void loadStaff();
    },
    []
  );

  function openCreateForm() {
    setEditingStaff(
      null
    );

    setForm(
      emptyForm
    );

    setFormError(
      ""
    );

    setSuccessMessage(
      ""
    );

    setShowForm(
      true
    );
  }

  function openEditForm(
    staff:
      StaffMember
  ) {
    setEditingStaff(
      staff
    );

    setForm({
      name:
        staff.name,

      displayName:
        staff.displayName ||
        "",

      email:
        staff.email,

      phone:
        staff.phone ||
        "",

      language:
        staff.language ||
        "sv",

      role:
        staff.role,

      active:
        staff.active,

      password:
        "",

      passwordConfirm:
        "",
    });

    setFormError(
      ""
    );

    setSuccessMessage(
      ""
    );

    setShowForm(
      true
    );
  }

  function closeForm() {
    setShowForm(
      false
    );

    setEditingStaff(
      null
    );

    setForm(
      emptyForm
    );

    setFormError(
      ""
    );
  }

  function updateForm<
    Key extends
      keyof StaffFormData
  >(
    key: Key,
    value:
      StaffFormData[Key]
  ) {
    setForm(
      (
        currentForm
      ) => ({
        ...currentForm,

        [key]:
          value,
      })
    );
  }

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFormError(
      ""
    );

    setSuccessMessage(
      ""
    );

    if (
      !editingStaff &&
      form.password.length <
        8
    ) {
      setFormError(
        text.passwordLength
      );

      return;
    }

    if (
      !editingStaff &&
      form.password !==
        form.passwordConfirm
    ) {
      setFormError(
        text.passwordMismatch
      );

      return;
    }

    setSaving(
      true
    );

    try {
      if (
        editingStaff
      ) {
        const updatedStaff =
  await updateStaffMember(
          editingStaff.id,
          {
            name:
              form.name,

            displayName:
              form.displayName,

            email:
              form.email,

            phone:
              form.phone,

            language:
              form.language,

            role:
              form.role,

            active:
              form.active,
          }
        );
        setStaffMembers(
  (
    currentStaff
  ) =>
    currentStaff.map(
      (
        staff
      ) =>
        staff.id ===
        updatedStaff.id
          ? updatedStaff
          : staff
    )
);

        setSuccessMessage(
          text.updated
        );
      } else {
        await createStaffMember({
          name:
            form.name,

          displayName:
            form.displayName,

          email:
            form.email,

          phone:
            form.phone,

          language:
            form.language,

          role:
            form.role,

          password:
            form.password,
        });

        setSuccessMessage(
          text.created
        );
      }

      closeForm();

      await loadStaff();
    } catch (
      error
    ) {
      console.error(
        "Failed to save staff:",
        error
      );

      setFormError(
        text.formError
      );
    } finally {
      setSaving(
        false
      );
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-5xl">

        <header className="mb-8 rounded-3xl bg-white p-6 shadow-xl">

          <div className="flex flex-col items-center gap-5 sm:flex-row">

            <img
              src={logo}
              alt="24 Sju"
              className="h-20 w-20 object-contain"
            />

            <div className="flex-1 text-center sm:text-left">

              <h1 className="text-3xl font-bold">

                👥 {text.title}

              </h1>

              <p className="mt-2 text-gray-500">

                {text.description}

              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="w-full rounded-xl bg-gray-200 px-5 py-3 font-medium transition hover:bg-gray-300 sm:w-auto"
            >

              ← {text.back}

            </button>

          </div>

        </header>

        <div className="mb-6 flex justify-end">

          <button
            type="button"
            onClick={
              openCreateForm
            }
            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >

            + {text.addStaff}

          </button>

        </div>

        {successMessage && (

          <div
            role="status"
            className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
          >

            ✓ {successMessage}

          </div>

        )}

        {showForm && (

          <section className="mb-8 rounded-3xl bg-white p-6 shadow-xl sm:p-8">

            <div className="mb-6 flex items-center justify-between gap-4">

              <h2 className="text-2xl font-bold">

                {
                  editingStaff
                    ? text.editStaff
                    : text.addStaff
                }

              </h2>

              <button
                type="button"
                onClick={
                  closeForm
                }
                className="rounded-xl bg-gray-200 px-4 py-2 font-medium transition hover:bg-gray-300"
              >

                ✕ {text.cancel}

              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >

              <div className="grid gap-6 md:grid-cols-2">

                <label className="block">

                  <span className="mb-2 block font-medium">

                    {text.fullName}

                  </span>

                  <input
                    type="text"
                    value={
                      form.name
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "name",
                        event
                          .target
                          .value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </label>

                <label className="block">

                  <span className="mb-2 block font-medium">

                    {
                      text
                        .displayName
                    }

                  </span>

                  <input
                    type="text"
                    value={
                      form
                        .displayName
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "displayName",
                        event
                          .target
                          .value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </label>

                <label className="block">

                  <span className="mb-2 block font-medium">

                    {text.email}

                  </span>

                  <input
                    type="email"
                    value={
                      form.email
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "email",
                        event
                          .target
                          .value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </label>

                <label className="block">

                  <span className="mb-2 block font-medium">

                    {text.phone}

                  </span>

                  <input
                    type="tel"
                    value={
                      form.phone
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "phone",
                        event
                          .target
                          .value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                </label>

                <label className="block">

                  <span className="mb-2 block font-medium">

                    {
                      text
                        .language
                    }

                  </span>

                  <select
                    value={
                      form
                        .language
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "language",
                        event
                          .target
                          .value as
                          StaffLanguage
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="sv">

                      🇸🇪 {
                        text
                          .swedish
                      }

                    </option>

                    <option value="en">

                      🇬🇧 {
                        text
                          .english
                      }

                    </option>

                    <option value="pl">

                      🇵🇱 {
                        text
                          .polish
                      }

                    </option>

                  </select>

                </label>

                <label className="block">

                  <span className="mb-2 block font-medium">

                    {text.role}

                  </span>

                  <select
                    value={
                      form.role
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "role",
                        event
                          .target
                          .value as
                          StaffRole
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="employee">

                      {
                        text
                          .employee
                      }

                    </option>

                    <option value="admin">

                      {
                        text
                          .admin
                      }

                    </option>

                  </select>

                </label>

              </div>

              {!editingStaff && (

                <div className="grid gap-6 md:grid-cols-2">

                  <label className="block">

                    <span className="mb-2 block font-medium">

                      {
                        text
                          .password
                      }

                    </span>

                    <input
                      type="password"
                      value={
                        form
                          .password
                      }
                      onChange={(
                        event
                      ) =>
                        updateForm(
                          "password",
                          event
                            .target
                            .value
                        )
                      }
                      minLength={
                        8
                      }
                      required
                      className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    <span className="mt-2 block text-sm text-gray-500">

                      {
                        text
                          .passwordHelp
                      }

                    </span>

                  </label>

                  <label className="block">

                    <span className="mb-2 block font-medium">

                      {
                        text
                          .passwordConfirm
                      }

                    </span>

                    <input
                      type="password"
                      value={
                        form
                          .passwordConfirm
                      }
                      onChange={(
                        event
                      ) =>
                        updateForm(
                          "passwordConfirm",
                          event
                            .target
                            .value
                        )
                      }
                      minLength={
                        8
                      }
                      required
                      className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </label>

                </div>

              )}

              {editingStaff && (

                <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

                  <input
                    type="checkbox"
                    checked={
                      form.active
                    }
                    onChange={(
                      event
                    ) =>
                      updateForm(
                        "active",
                        event
                          .target
                          .checked
                      )
                    }
                    className="h-5 w-5"
                  />

                  <span className="font-medium">

                    {text.active}

                  </span>

                </label>

              )}

              {formError && (

                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                >

                  {formError}

                </div>

              )}

              <button
                type="submit"
                disabled={
                  saving
                }
                className="w-full rounded-xl bg-blue-600 p-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
              >

                {
                  saving
                    ? text.saving
                    : text.save
                }

              </button>

            </form>

          </section>

        )}

        <section>

          {loading && (

            <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">

              {text.loading}

            </div>

          )}

          {loadError && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

              {loadError}

            </div>

          )}

          {!loading &&
            !loadError &&
            staffMembers
              .length ===
              0 && (

              <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow">

                {text.noStaff}

              </div>

            )}

          {!loading &&
            !loadError &&
            staffMembers
              .length >
              0 && (

              <div className="grid gap-5 md:grid-cols-2">

                {
                  staffMembers.map(
                    (
                      staff
                    ) => (

                      <article
                        key={
                          staff.id
                        }
                        className="rounded-2xl bg-white p-6 shadow"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <h2 className="text-xl font-bold">

                              {
                                staff
                                  .displayName ||
                                staff
                                  .name ||
                                staff
                                  .email
                              }

                            </h2>

                            {
                              staff
                                .displayName &&
                              staff
                                .name && (

                                <p className="mt-1 text-sm text-gray-500">

                                  {
                                    staff
                                      .name
                                  }

                                </p>

                              )
                            }

                          </div>

                          <span
                            className={
                              staff
                                .active
                                ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                                : "rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600"
                            }
                          >

                            {
                              staff
                                .active
                                ? text
                                    .active
                                : text
                                    .inactive
                            }

                          </span>

                        </div>

                        <div className="mt-5 space-y-2 text-gray-600">

                          <p>

                            ✉️ {
                              staff
                                .email
                            }

                          </p>

                          {
                            staff
                              .phone && (

                              <p>

                                📞 {
                                  staff
                                    .phone
                                }

                              </p>

                            )
                          }

                          <p>

                            👤 {
                              staff
                                .role ===
                              "admin"
                                ? text
                                    .admin
                                : text
                                    .employee
                            }

                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(
                              staff
                            )
                          }
                          className="mt-6 w-full rounded-xl bg-gray-200 p-3 font-semibold transition hover:bg-gray-300"
                        >

                          ✏️ {
                            text
                              .edit
                          }

                        </button>

                      </article>

                    )
                  )
                }

              </div>

            )}

        </section>

      </div>

    </div>
  );
}

export default StaffManagementPage;
