# ADR-001 - Adopt Vertical Slice Architecture

## Status

Accepted

## Date

2026-06-08

---

## Context

Acai Workspace is an AI platform that includes:

- Knowledge Base (RAG)
- AI Chat
- Document Analysis
- Audio Transcription
- Image Modification
- Report Generation

The application will contain many independent business capabilities.

Traditional layered architectures often result in code being organized by technical concern:

- Controllers
- Services
- Repositories
- Models

As the system grows, implementing a single feature requires modifications across multiple folders and projects.

---

## Decision

Adopt Vertical Slice Architecture.

Features will be organized by business capability and use case.

Example:

Features/

Templates/

CreateTemplate/

- Endpoint.cs
- Command.cs
- Handler.cs
- Validator.cs
- Response.cs

---

## Consequences

### Positive

- High cohesion
- Easier maintenance
- Easier onboarding
- Better alignment with CQRS
- Easier feature ownership
- Works naturally with MediatR

### Negative

- Some code duplication may occur
- Developers unfamiliar with VSA require onboarding

---

## Alternatives Considered

### Layered Architecture

Rejected due to feature scattering.

### Clean Architecture with Application Layer

Rejected initially to reduce complexity.

May be introduced later if necessary.
