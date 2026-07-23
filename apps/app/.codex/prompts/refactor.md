# Refactor Prompt

Read .codex/instructions.md before doing anything.

Goal:

Refactor existing code without changing behaviour.

Requirements

- Read the entire file first.
- Understand the purpose before modifying code.
- Preserve functionality.
- Preserve styling.
- Reuse existing hooks and utilities.
- Remove dead code.
- Remove unused imports.
- Remove unused variables.
- Keep naming consistent.
- Do not introduce new dependencies.
- Modify only files that are required.

Validation

Run:

npm run build

If build fails:

Fix every TypeScript error you introduced.

Summary

Provide:

- Files changed
- What changed
- Why
- Any recommendations