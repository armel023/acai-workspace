# ADR-007 - Use Hangfire for Background Processing

## Status

Accepted

## Date

2026-06-08

---

## Context

AI workloads can be long-running:

- Embedding generation
- Audio transcription
- Report generation
- Document ingestion

Blocking HTTP requests is undesirable.

---

## Decision

Use Hangfire for background job processing.

PostgreSQL will be used as Hangfire storage.

---

## Consequences

### Positive

- Reliable background processing
- Retry support
- Monitoring dashboard
- Easy ASP.NET Core integration

### Negative

- Additional infrastructure component

---

## Alternatives Considered

### Quartz.NET

Rejected due to additional complexity.

### Azure Functions

Rejected to maintain platform independence.

### In-Memory Tasks

Rejected because jobs would be lost during restarts.
