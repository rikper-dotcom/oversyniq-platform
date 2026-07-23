import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

import {
  useTranslation,
} from "../hooks/useTranslation";

import {
  changeCurrentPassword,
  getCurrentProfile,
  updateCurrentProfile,
  type ProfileLanguage,
} from "../services/profileService";

function ProfilePage() {
  const navigate =
    useNavigate();

  const {
    t,
  } = useTranslation();

  const currentProfile =
    getCurrentProfile();

  const [
    name,
    setName,
  ] = useState(
    currentProfile?.name ??
      ""
  );

  const [
    displayName,
    setDisplayName,
  ] = useState(
    currentProfile
      ?.displayName ??
      ""
  );

  const [
    phone,
    setPhone,
  ] = useState(
    currentProfile?.phone ??
      ""
  );

  const [
    profileLanguage,
    setProfileLanguage,
  ] = useState<
    ProfileLanguage
  >(
    currentProfile
      ?.language ||
      "sv"
  );

  const [
    savingProfile,
    setSavingProfile,
  ] = useState(
    false
  );

  const [
    profileError,
    setProfileError,
  ] = useState(
    ""
  );

  const [
    profileSuccess,
    setProfileSuccess,
  ] = useState(
    ""
  );

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState(
    ""
  );

  const [
    newPassword,
    setNewPassword,
  ] = useState(
    ""
  );

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState(
    ""
  );

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(
    false
  );

  const [
    passwordError,
    setPasswordError,
  ] = useState(
    ""
  );

  const [
    passwordSuccess,
    setPasswordSuccess,
  ] = useState(
    ""
  );

  const initials =
    useMemo(
      () => {
        const profileName =
          displayName.trim() ||
          name.trim() ||
          currentProfile
            ?.email ||
          "?";

        const words =
          profileName
            .split(
              /\s+/
            )
            .filter(
              Boolean
            );

        if (
          words.length === 0
        ) {
          return "?";
        }

        if (
          words.length === 1
        ) {
          return words[
            0
          ]
            .slice(
              0,
              2
            )
            .toUpperCase();
        }

        return (
          words[
            0
          ][0] +
          words[
            words.length -
              1
          ][0]
        ).toUpperCase();
      },
      [
        currentProfile
          ?.email,
        displayName,
        name,
      ]
    );

  async function handleProfileSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setProfileError(
      ""
    );

    setProfileSuccess(
      ""
    );

    setSavingProfile(
      true
    );

    try {
      await updateCurrentProfile({
        name,
        displayName,
        phone,
        language:
          profileLanguage,
      });

      setProfileSuccess(
        t.profile.profile.profileSaved
      );
    } catch (
      saveError
    ) {
      console.error(
  "Failed to save profile:",
  JSON.stringify(
    saveError,
    null,
    2
  )
);

      setProfileError(
        t.profile.profile.profileError
      );
    } finally {
      setSavingProfile(
        false
      );
    }
  }

  async function handlePasswordSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setPasswordError(
      ""
    );

    setPasswordSuccess(
      ""
    );

    if (
      newPassword !==
      confirmPassword
    ) {
      setPasswordError(
        t.profile.password.passwordMismatch
      );

      return;
    }

    if (
      newPassword.length <
      8
    ) {
      setPasswordError(
        t.profile.password.passwordLength
      );

      return;
    }

    setChangingPassword(
      true
    );

    try {
      await changeCurrentPassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword(
        ""
      );

      setNewPassword(
        ""
      );

      setConfirmPassword(
        ""
      );

      setPasswordSuccess(
        t.profile.password.passwordChanged
      );
    } catch (
      changeError
    ) {
      console.error(
        "Failed to change password:",
        changeError
      );

      setPasswordError(
        t.profile.password.passwordError
      );
    } finally {
      setChangingPassword(
        false
      );
    }
  }

  if (
    !currentProfile
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <p className="text-red-700">

            {
              t.profile.general.missingProfile
            }

          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/staff/login"
              )
            }
            className="mt-6 w-full rounded-xl bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
          >

            {
              t.profile.general.back
            }

          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto max-w-4xl">

        <header className="mb-8 rounded-3xl bg-white p-6 shadow-xl">

          <div className="flex flex-col items-center gap-5 sm:flex-row">

            <img
              src={
                logo
              }
              alt="24 Sju"
              className="h-20 w-20 object-contain"
            />

            <div className="flex-1 text-center sm:text-left">

              <h1 className="text-3xl font-bold">

                {
                  t.profile.general.title
                }

              </h1>

              <p className="mt-2 text-gray-500">

                {
                  t.profile.general.description
                }

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

              ← {
                t.profile.general.back
              }

            </button>

          </div>

        </header>

        <section className="mb-8 rounded-3xl bg-white p-6 shadow-xl sm:p-8">

          <div className="mb-8 flex flex-col items-center gap-4 border-b border-gray-200 pb-8 sm:flex-row">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow">

              {
                initials
              }

            </div>

            <div className="text-center sm:text-left">

              <h2 className="text-2xl font-bold">

                {
                  displayName ||
                  name ||
                  currentProfile
                    .email
                }

              </h2>

              <p className="mt-1 text-gray-500">

                {
                  currentProfile
                    .email
                }

              </p>

              <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">

                {
                  currentProfile
                    .role ===
                  "admin"
                    ? t.profile.profile.admin
                    : t.profile.profile.employee
                }

              </span>

            </div>

          </div>

          <h2 className="mb-6 text-2xl font-bold">

            {
              t.profile.profile.title
            }

          </h2>

          <form
            onSubmit={
              handleProfileSubmit
            }
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-2">

              <label className="block">

                <span className="mb-2 block font-medium">

                  {
                    t.profile.profile.fullName
                  }

                </span>

                <input
                  type="text"
                  value={
                    name
                  }
                  onChange={(
                    event
                  ) =>
                    setName(
                      event
                        .target
                        .value
                    )
                  }
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </label>

              <label className="block">

                <span className="mb-2 block font-medium">

                  {
                    t.profile.profile.displayName
                  }

                </span>

                <input
                  type="text"
                  value={
                    displayName
                  }
                  onChange={(
                    event
                  ) =>
                    setDisplayName(
                      event
                        .target
                        .value
                    )
                  }
                  autoComplete="nickname"
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <span className="mt-2 block text-sm text-gray-500">

                  {
                    t.profile.profile.displayNameHelp
                  }

                </span>

              </label>

              <label className="block">

                <span className="mb-2 block font-medium">

                  {
                    t.profile.profile.phone
                  }

                </span>

                <input
                  type="tel"
                  value={
                    phone
                  }
                  onChange={(
                    event
                  ) =>
                    setPhone(
                      event
                        .target
                        .value
                    )
                  }
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </label>

              <label className="block">

                <span className="mb-2 block font-medium">

                  {
                    t.profile.profile.language
                  }

                </span>

                <select
                  value={
                    profileLanguage
                  }
                  onChange={(
                    event
                  ) =>
                    setProfileLanguage(
                      event
                        .target
                        .value as
                        ProfileLanguage
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >

                  <option value="sv">

                    🇸🇪 {
                      t.profile.profile.swedish
                    }

                  </option>

                  <option value="en">

                    🇬🇧 {
                      t.profile.profile.english
                    }

                  </option>

                  <option value="pl">

                    🇵🇱 {
                      t.profile.profile.polish
                    }

                  </option>

                </select>

              </label>

            </div>

            <div>

              <span className="mb-2 block font-medium">

                {
                  t.profile.profile.email
                }

              </span>

              <div className="rounded-xl border border-gray-200 bg-gray-100 p-3 text-gray-600">

                {
                  currentProfile
                    .email
                }

              </div>

              <p className="mt-2 text-sm text-gray-500">

                {
                  t.profile.profile.emailHelp
                }

              </p>

            </div>

            <div>

              <span className="mb-2 block font-medium">

                {
                  t.profile.profile.role
                }

              </span>

              <div className="rounded-xl border border-gray-200 bg-gray-100 p-3 text-gray-600">

                {
                  currentProfile
                    .role ===
                  "admin"
                    ? t.profile.profile.admin
                    : t.profile.profile.employee
                }

              </div>

            </div>

            {
              profileError && (

                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                >

                  {
                    profileError
                  }

                </div>

              )
            }

            {
              profileSuccess && (

                <div
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
                >

                  ✓ {
                    profileSuccess
                  }

                </div>

              )
            }

            <button
              type="submit"
              disabled={
                savingProfile
              }
              className="w-full rounded-xl bg-blue-600 p-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
            >

              {
                savingProfile
                  ? t.profile.profile.saving
                  : t.profile.profile.save
              }

            </button>

          </form>

        </section>

        <section className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">

              🔒 {
                t.profile.password.title
              }

            </h2>

            <p className="mt-2 text-gray-500">

              {
                t.profile.password.description
              }

            </p>

          </div>

          <form
            onSubmit={
              handlePasswordSubmit
            }
            className="space-y-6"
          >

            <label className="block">

              <span className="mb-2 block font-medium">

                {
                  t.profile.password.currentPassword
                }

              </span>

              <input
                type="password"
                value={
                  currentPassword
                }
                onChange={(
                  event
                ) =>
                  setCurrentPassword(
                    event
                      .target
                      .value
                  )
                }
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </label>

            <div className="grid gap-6 md:grid-cols-2">

              <label className="block">

                <span className="mb-2 block font-medium">

                  {
                    t.profile.password.newPassword
                  }

                </span>

                <input
                  type="password"
                  value={
                    newPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setNewPassword(
                      event
                        .target
                        .value
                    )
                  }
                  autoComplete="new-password"
                  minLength={
                    8
                  }
                  required
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </label>

              <label className="block">

                <span className="mb-2 block font-medium">

                  {
                    t.profile.password.confirmPassword
                  }

                </span>

                <input
                  type="password"
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setConfirmPassword(
                      event
                        .target
                        .value
                    )
                  }
                  autoComplete="new-password"
                  minLength={
                    8
                  }
                  required
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </label>

            </div>

            {
              passwordError && (

                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                >

                  {
                    passwordError
                  }

                </div>

              )
            }

            {
              passwordSuccess && (

                <div
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
                >

                  ✓ {
                    passwordSuccess
                  }

                </div>

              )
            }

            <button
              type="submit"
              disabled={
                changingPassword
              }
              className="w-full rounded-xl bg-gray-900 p-4 text-lg font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
            >

              {
                changingPassword
                  ? t.profile.password.changingPassword
                  : t.profile.password.changePassword
              }

            </button>

          </form>

        </section>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          className="mt-8 w-full rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300"
        >

          ← {
            t.profile.general.back
          }

        </button>

      </div>

    </div>
  );
}

export default ProfilePage;
