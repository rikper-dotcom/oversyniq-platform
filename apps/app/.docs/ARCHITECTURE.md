# Architecture

## Folder Structure

```
src/
    components/
    contexts/
    hooks/
    i18n/
    modules/
    pages/
    services/
    utils/
```

---

## Modules

Each feature belongs in its own module.

Example:

```
modules/
    cleaning/
    staff/
    temperature/
    timereport/
    incidents/
```

---

## Principles

- Reuse existing code.
- Keep business logic outside UI.
- One responsibility per component.
- Keep components small.
- Avoid duplicate functionality.

---

## Routing

React Router is used for navigation.

---

## State

Prefer React Context before introducing additional state libraries.

---

## Styling

TailwindCSS only.

---

## Backend

PocketBase is the backend.

Authentication, database and realtime functionality should use PocketBase whenever possible.
