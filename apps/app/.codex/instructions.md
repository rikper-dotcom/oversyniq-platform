# Oversyniq / 24SjuHub Development Guidelines

## Project Goal

This project is being developed as a production-quality application.

Every change should improve maintainability without changing existing functionality unless explicitly requested.

---

# Core Principles

1. Never break existing functionality.

2. Preserve the visual design unless explicitly instructed.

3. Prefer refactoring over rewriting.

4. Build must always pass before a task is considered complete.

---

# Architecture

## React

- Use functional components only.
- Prefer hooks over classes.
- Keep components focused.

---

## TypeScript

- No use of `any`.
- Keep strict typing.
- Remove unused imports and variables.
- Never suppress TypeScript errors.

---

## Internationalization

The project uses the custom translation system.

Rules:

- NEVER hardcode user-visible text.
- Always use:

```ts
const { t } = useTranslation();
```

- Add new translations to:

```
src/i18n/sv
src/i18n/en
src/i18n/pl
```

- Keep translation keys identical between languages.

---

# Styling

Use Tailwind only.

Do not introduce:

- Bootstrap
- Material UI
- Chakra
- Inline styles

unless explicitly requested.

---

# Components

When a page becomes large:

Split into components.

Preferred structure:

```
modules/
    profile/
    cleaning/
    staff/
    temperature/
    timereport/
```

Keep business logic outside UI components whenever practical.

---

# Code Style

Prefer

```ts
const value = ...
```

instead of

```ts
let value = ...
```

Avoid nested ternaries.

Prefer early returns.

Keep functions short.

---

# Refactoring Rules

Before changing code:

Read the complete file.

Understand the purpose.

Avoid unnecessary changes.

Only modify what is required.

---

# Validation

Before considering work complete:

Run

```bash
npm run build
```

If build cannot be run, clearly explain why.

---

# Git

Never modify unrelated files.

Keep commits focused.

Do not reformat unrelated code.

---

# Existing Conventions

The project already contains:

- useTranslation()
- PocketBase
- React Router
- TailwindCSS
- Vite

Reuse existing solutions.

Do not introduce alternative libraries unless requested.

---

# Performance

Avoid unnecessary renders.

Prefer memoization only when justified.

Do not optimize prematurely.

---

# Communication

Before making major changes:

Explain the plan.

After completion:

Summarize:

- Files modified
- What changed
- Why

---

# Safety

Never delete code unless certain it is obsolete.

If uncertain:

Ask before making destructive changes.

---

# Priority Order

1. Correctness
2. Build passes
3. Maintainability
4. Readability
5. Performance
6. Minimal code changes

---

# Definition of Done

A task is complete only if:

✓ Functionality preserved

✓ Build passes

✓ No TypeScript errors

✓ No unused imports

✓ No unused variables

✓ Translation system respected

✓ No unrelated files modified

# AI Collaboration

When performing refactoring:

- Read the entire project context before modifying files.

- Prefer existing project patterns over introducing new ones.

- Do not invent architecture if an existing one already exists.

- If the same hook, helper, component or utility already exists elsewhere,
  reuse it.

- Before creating a new component or utility,
  search the project for an existing equivalent.

- If multiple files require changes,
  explain why each file must be modified.

- Do not rename files unless explicitly instructed.
---

# Oversyniq Architecture

Always prefer the existing project architecture.

Current stack:

- React
- TypeScript
- Vite
- TailwindCSS
- PocketBase
- React Router

Do not introduce new frameworks.

Reuse existing hooks whenever possible.

Prefer extending existing modules over creating duplicate functionality.

---

# Required Checks

Before finishing any task:

1. Check for TypeScript errors.
2. Check for unused imports.
3. Check for unused variables.
4. Ensure translations exist in all languages.
5. Ensure no unrelated files were modified.

---

# Response Format

After every completed task, provide:

## Summary

- Files modified
- Why they were modified
- Any follow-up recommendations

If validation could not be performed, explain why.