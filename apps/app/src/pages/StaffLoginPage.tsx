import {
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo.png";

import pb from "../services/pocketbase";

import {
  useTranslation,
} from "../hooks/useTranslation";

function StaffLoginPage() {
  const navigate = useNavigate();

  const { t } =
    useTranslation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loggingIn, setLoggingIn] =
    useState(false);

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoggingIn(true);

    try {
      const authData =
        await pb
          .collection("staff")
          .authWithPassword(
            email.trim(),
            password
          );

      if (
        authData.record.active !== true
      ) {
        pb.authStore.clear();

        setError(
          t.login.inactiveAccount
        );

        return;
      }

      navigate("/dashboard");
    } catch (loginError) {
      console.error(
        "Staff login failed:",
        loginError
      );

      setError(
        t.login.error
      );
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="24 Sju"
            className="h-24 w-24 object-contain"
          />
        </div>

        <h1 className="text-center text-3xl font-bold">
          {t.login.title}
        </h1>

        <p className="mb-8 text-center text-gray-500">
          {t.login.subtitle}
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium"
            >
              {t.login.email}
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium"
            >
              {t.login.password}
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full rounded-xl bg-blue-600 p-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingIn
              ? t.login.loggingIn
              : t.login.login}
          </button>

        </form>

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          className="mt-5 w-full rounded-xl bg-gray-200 p-3 font-medium transition hover:bg-gray-300"
        >
          ← {t.login.back}
        </button>

      </div>
    </div>
  );
}

export default StaffLoginPage;