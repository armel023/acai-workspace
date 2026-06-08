# Create Orchestrator Prompt

Use rules from \_base.md.

---

## ORCHESTRATOR NAME

{{ORCHESTRATOR_NAME}}

---

## WORKFLOW STEPS

{{WORKFLOW}}

---

## OUTPUT

Orchestrators/{{ORCHESTRATOR_NAME}}.cs

Rules:

- Coordinate multiple agents
- No HTTP logic
- No UI logic
- Handle retries
- Use CancellationToken
