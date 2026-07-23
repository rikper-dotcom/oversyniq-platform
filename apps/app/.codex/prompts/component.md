# Component Prompt

Read .codex/instructions.md before starting.

Goal

Split large components into maintainable smaller components.

Requirements

- Preserve behaviour.
- Preserve styling.
- Keep props typed.
- Avoid duplicate code.
- Reuse existing components.
- Keep logic outside UI where practical.

Suggested structure

modules/

feature/

Component.tsx

Hooks.ts

types.ts

utils.ts

Validation

Run:

npm run build

Provide a summary afterwards.