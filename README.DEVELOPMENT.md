# Acai Workspace - Development Guide

This document explains how to set up, run, and develop Acai Workspace locally.

---

# Prerequisites

Install:

- .NET SDK 9+
- Node.js 22+
- Docker Desktop
- Git

Optional:

- PostgreSQL client (pgAdmin / DBeaver)
- Visual Studio / Rider / VS Code

---

# Clone Repository

```bash
git clone https://github.com/yourusername/AcaiWorkspace.git
cd AcaiWorkspace
```

---

# Start Infrastructure (Docker)

Acai Workspace uses Docker Compose for local services.

```bash
docker compose up -d
```

This starts:

- PostgreSQL (with pgvector)
- Seq (logging)

---

# Backend Setup

## Run API

```bash
cd src/AcaiWorkspace.Api
dotnet restore
dotnet run
```

API will run at:

```
https://localhost:5001
```

Swagger:

```
https://localhost:5001/swagger
```

---

## Database Migrations

Create migration:

```bash
dotnet ef migrations add InitialCreate
```

Update database:

```bash
dotnet ef database update
```

---

## Environment Variables

Create `.env` file or configure `appsettings.Development.json`.

Example:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=acaiworkspace

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

OPENAI_API_KEY=your_api_key

SEQ_URL=http://localhost:5341

JWT_SECRET=replace_me
```

---

# Frontend Setup

## Install Dependencies

```bash
cd src/acai-workspace-web
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Build Frontend

```bash
npm run build
```

---

# Project Structure (Development View)

## Backend

```text
AcaiWorkspace.Api
├── Features/
├── Agents/
├── Orchestrators/
├── Infrastructure/
├── Shared/
```

## Frontend

```text
src/
├── features/
├── components/
├── services/
├── hooks/
├── stores/
```

---

# Vertical Slice Workflow

When creating a new feature:

## Example: Create Document Upload Feature

```text
Features/Documents/UploadDocument/
├── Endpoint.cs
├── Command.cs
├── Handler.cs
├── Validator.cs
└── Response.cs
```

---

# AI Development Guidelines

## Agents

Located in:

```
Agents/
```

Examples:

- KnowledgeAgent
- DocumentAgent
- AudioAgent
- ImageAgent
- ReportAgent

---

## Orchestrators

Located in:

```
Orchestrators/
```

Used for multi-step workflows:

- Document ingestion pipeline
- Report generation pipeline

---

# Running Tests

## Backend

```bash
dotnet test
```

## Frontend

```bash
npm run test
```

---

# Logging & Monitoring

## Logging

- Serilog
- Seq Dashboard

Access:

```
http://localhost:5341
```

---

## Observability

- OpenTelemetry (planned)
- Structured logs for AI workflows

---

# Docker Commands

Stop services:

```bash
docker compose down
```

Rebuild:

```bash
docker compose up --build
```

---

# Common Issues

## Port already in use

Change ports in:

- docker-compose.yml
- launchSettings.json

---

## EF migration errors

Ensure:

- PostgreSQL is running
- Connection string is correct

---

# Coding Standards

- Use Vertical Slice Architecture
- Use MediatR for all requests
- Use FluentValidation
- Use async/await everywhere
- Always pass CancellationToken
- No business logic in endpoints
- No repository pattern
- Use EF Core directly

---

# Deployment Notes

Frontend → Vercel
Backend → Render / Railway / Azure
Database → Neon / Supabase PostgreSQL

---

# Contact

Maintained by:

**Armel Ardael**
