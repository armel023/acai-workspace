# Acai Workspace

> Enterprise AI Workspace for Knowledge, Documents, Audio, Images, and Intelligent Automation.

---

## Overview

Acai Workspace is a modern AI-powered platform that enables users and organizations to:

- Chat with their knowledge base (RAG)
- Upload and analyze documents
- Transcribe and summarize audio
- Modify images using AI
- Generate structured reports using templates
- Orchestrate multi-agent AI workflows

It is designed using **Vertical Slice Architecture**, **CQRS**, and **Semantic Kernel** to ensure scalability and maintainability.

---

## Key Features

### Knowledge Base (RAG)

- Document ingestion
- Embedding generation (pgvector)
- Semantic search
- AI-powered contextual answers

### AI Chat

- Context-aware conversations
- Streaming responses (SignalR)
- Conversation memory

### Document Intelligence

- Upload and process documents
- AI summarization
- Structured extraction
- Report generation

### Audio Intelligence

- Speech-to-text transcription
- Summary generation
- Meeting insights

### Image Intelligence

- Prompt-based image modification
- AI-assisted editing workflows

### Report Generation

- Template-based AI reports
- Export-ready outputs

### Multi-Agent System

- KnowledgeAgent
- DocumentAgent
- AudioAgent
- ImageAgent
- ReportAgent

---

## Architecture

### Backend

- ASP.NET Core 9
- Minimal APIs + Carter
- Vertical Slice Architecture
- CQRS with MediatR
- FluentValidation
- EF Core + PostgreSQL
- pgvector for embeddings
- Semantic Kernel (AI orchestration)
- SignalR (real-time communication)
- Hangfire (background jobs)
- Serilog + OpenTelemetry

### Frontend

- React + TypeScript + Vite
- Material UI (MUI)
- TanStack Query
- Zustand
- React Hook Form + Zod
- SignalR client

### Infrastructure

- Docker + Docker Compose
- PostgreSQL + pgvector
- Seq logging

---

## Architecture Documentation

All architectural decisions are documented in:

```text
docs/adr/
```

---

## Project Structure

```text
AcaiWorkspace/

src/
├── AcaiWorkspace.Api/
├── AcaiWorkspace.Domain/
├── AcaiWorkspace.Infrastructure/
└── acai-workspace-web/

docs/
├── adr/
├── architecture/
└── frontend/
```

---

## Getting Started

See:

👉 `README.DEVELOPMENT.md`

for full setup instructions.

---

## Roadmap

- Authentication & Authorization
- Knowledge Base (RAG)
- Document Intelligence
- Audio Processing
- AI Chat Streaming
- Image Generation Tools
- Multi-Agent Orchestration
- Enterprise Features

---

## Deployment Targets

- Frontend: Vercel
- Backend: Render / Railway / Azure
- Database: PostgreSQL (Neon / Supabase)
- Storage: AWS S3 / Cloudflare R2

---

## License

MIT

---

## Author

**Armel Ardael**

Built as a portfolio-grade AI engineering system showcasing modern .NET + AI architecture.
