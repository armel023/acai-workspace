# ADR-002 - Use Carter and Minimal APIs

## Status

Accepted

## Date

2026-06-08

---

## Context

Acai Workspace requires:

- Lightweight APIs
- CQRS support
- Vertical Slice support
- OpenAPI integration

The team evaluated:

- Controllers
- Pure Minimal APIs
- Carter
- FastEndpoints

---

## Decision

Use ASP.NET Core Minimal APIs with Carter.

Endpoints will be implemented as ICarterModule.

Example:

public sealed class Endpoint : ICarterModule

---

## Consequences

### Positive

- Lightweight
- Native ASP.NET Core
- Easy integration with MediatR
- Supports Vertical Slice Architecture
- Minimal framework overhead

### Negative

- Less familiar than Controllers for some developers

---

## Alternatives Considered

### Controllers

Rejected due to increased coupling and larger endpoint classes.

### FastEndpoints

Rejected because it introduces additional abstractions not required by the project.

### Pure Minimal APIs

Rejected because Carter provides better route organization.
