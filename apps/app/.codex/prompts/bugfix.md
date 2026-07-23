# Bug Fix Prompt

Read .codex/instructions.md first.

Goal

Fix the reported bug.

Requirements

Understand the root cause before changing code.

Do not rewrite unrelated code.

Do not introduce regressions.

Explain:

- Cause
- Solution
- Why it works

Validation

Run

npm run build

Ensure no new warnings or errors were introduced.