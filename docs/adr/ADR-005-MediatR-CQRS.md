# ADR-005 - Use MediatR and CQRS

## Status

Accepted

## Date

2026-06-08

---

## Context

The application requires:

- Separation of reads and writes
- Clear request handling
- Cross-cutting concerns
- Feature isolation

---

## Decision

Use MediatR for implementing CQRS.

Commands:

- Create
- Update
- Delete

Queries:

- Read operations

Every feature will communicate through MediatR.

---

## Consequences

### Positive

- Consistent request pipeline
- Easy validation integration
- Supports logging behaviors
- Supports transaction behaviors
- Supports Vertical Slice Architecture

### Negative

- Additional abstraction layer
- Slight learning curve

---

## Alternatives Considered

### Direct Service Calls

Rejected because it encourages tighter coupling.

### Traditional Service Layer

Rejected due to increased architectural complexity.
