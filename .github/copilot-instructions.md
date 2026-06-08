# Acai Workspace

Acai Workspace is an Enterprise AI Workspace platform built using ASP.NET Core, Semantic Kernel, PostgreSQL, and React.

The system provides:

- Knowledge Base (RAG)
- AI Chat
- Document Analysis
- Audio Transcription
- Image Modification
- Template-Based Report Generation
- Multi-Agent AI Workflows

---

# Technology Stack

## Backend

- ASP.NET Core 9
- Minimal APIs
- Carter
- Vertical Slice Architecture
- CQRS
- MediatR
- FluentValidation
- Entity Framework Core
- PostgreSQL
- pgvector
- Semantic Kernel
- SignalR
- Hangfire
- Serilog
- OpenTelemetry

## Frontend

- React
- TypeScript
- Vite
- Material UI (MUI)
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Zustand
- Axios
- SignalR Client

---

# Architecture Principles

Follow Vertical Slice Architecture.

Organize features by use case.

Example:

Features/
└── Templates/
└── CreateTemplate/
├── Endpoint.cs
├── Command.cs
├── Handler.cs
├── Validator.cs
└── Response.cs

Never organize by technical layer.

Do NOT create folders like:

- Controllers
- Services
- Repositories
- Managers

Features must own their use cases.

---

# CQRS Rules

Commands modify state.

Queries read state.

Every command/query must have:

- Request object
- Handler
- Validator (if needed)
- Endpoint
- Response DTO

Use MediatR for all request handling.

Endpoints must delegate immediately to MediatR.

Do not place business logic in endpoints.

---

# Minimal API Rules

Use Carter modules.

Endpoints must remain thin.

Good:

app.MapPost(...)
=> sender.Send(command);

Bad:

Business logic directly inside endpoint.

---

# Validation Rules

Use FluentValidation.

Never manually validate request objects.

Validation belongs in validators.

Example:

CreateUserValidator

Do not use DataAnnotations.

---

# Entity Framework Rules

Use EF Core Code First.

Use IEntityTypeConfiguration for entity mappings.

Do not place EF configuration inside entities.

Use AsNoTracking for read-only queries.

Use CancellationToken everywhere.

Prefer projection instead of loading entire entities.

Avoid N+1 queries.

Never expose EF entities directly from endpoints.

Use response DTOs.

---

# Database Rules

Primary database:

- PostgreSQL

Vector storage:

- PostgreSQL pgvector

Do not introduce additional databases unless explicitly requested.

Store embeddings using pgvector.

---

# Logging Rules

Use Serilog.

Inject ILogger<T>.

Log:

- Errors
- External service calls
- Long-running jobs
- AI requests

Do not log secrets.

Do not log API keys.

---

# Error Handling

Use global exception handling.

Avoid try/catch blocks unless handling a specific failure.

Prefer Result pattern where appropriate.

Return meaningful API responses.

---

# Background Processing

Use Hangfire for:

- Embedding generation
- Audio transcription
- Report generation
- Long-running AI workflows

Do not block HTTP requests for long-running operations.

---

# Realtime Communication

Use SignalR for:

- Chat streaming
- Upload progress
- Job progress
- Notifications

Avoid polling when SignalR is available.

---

# AI Architecture

Use Semantic Kernel.

Create specialized agents:

- KnowledgeAgent
- DocumentAgent
- AudioAgent
- ImageAgent
- ReportAgent

Use orchestrators when multiple agents participate in a workflow.

Example:

Document Upload
→ DocumentAgent
→ KnowledgeAgent
→ ReportAgent

Keep agent responsibilities focused.

---

# Domain Rules

Domain project contains:

- Entities
- Value Objects
- Enums
- Domain Events

Domain must not depend on:

- EF Core
- ASP.NET Core
- Semantic Kernel
- OpenAI

Keep domain pure.

---

# Infrastructure Rules

Infrastructure contains:

- EF Core
- Semantic Kernel
- OpenAI
- Storage
- Redis
- External APIs

Infrastructure implements abstractions.

---

# API Rules

Features live in API project.

Feature folders contain:

- Endpoint
- Command or Query
- Handler
- Validator
- Response

Keep related files together.

---

# Frontend Architecture

Organize frontend by feature.

Example:

src/
├── features/
├── components/
├── hooks/
├── services/
├── stores/
├── pages/

Reusable UI belongs in components.

Feature-specific UI belongs in features.

---

# React Rules

Use functional components.

Use TypeScript everywhere.

Avoid any.

Prefer explicit types.

Use React Query for server state.

Do not use useEffect for data fetching.

Use Axios for HTTP calls.

---

# Form Rules

Use:

- React Hook Form
- Zod

Do not manually manage form state.

---

# State Management

Use Zustand.

Use React Query for server state.

Do not store server state in Zustand.

---

# Component Rules

Components should be:

- Small
- Reusable
- Focused

Prefer composition over inheritance.

Avoid large page components.

---

# Testing Rules

Generate tests whenever implementing a feature.

Backend:

- xUnit
- FluentAssertions

Frontend:

- Vitest
- React Testing Library

Focus on:

- Handlers
- Validators
- Business rules

---

# Code Quality Rules

Always:

- Use async/await
- Pass CancellationToken
- Use dependency injection
- Follow SOLID principles
- Use meaningful names

Avoid:

- Static helper classes
- Service locator pattern
- Fat endpoints
- Generic repository pattern
- Premature abstractions

When generating code, prefer maintainability and readability over cleverness.
