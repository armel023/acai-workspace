# Create Feature Prompt

Use the rules from \_base.md.

---

## FEATURE NAME

{{FEATURE_NAME}}

---

## FEATURE DESCRIPTION

{{FEATURE_DESCRIPTION}}

---

## USE CASES

{{FEATURES}}

---

## DOMAIN ENTITY

{{ENTITY}}

---

## OUTPUT REQUIREMENTS

Generate a full Vertical Slice module:

Features/{{FEATURE_NAME}}/

- Endpoint.cs (Carter)
- Command.cs / Query.cs
- Handler.cs
- Validator.cs
- Response.cs

---

## RULES

- No pseudo-code
- No missing files
- No generic repository
- Use EF Core directly
- Use MediatR
- Use async/await
