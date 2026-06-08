# Orchestrator Template

## Purpose

Orchestrators coordinate workflows involving multiple agents, services, or infrastructure components.

They define execution order and business processes.

---

# Example Workflow

Document Upload

↓

DocumentAgent

↓

KnowledgeAgent

↓

ReportAgent

↓

Notification

---

# Responsibilities

Orchestrators may:

- Coordinate agents
- Manage workflow execution
- Handle retries
- Handle failures
- Publish events

Orchestrators must not:

- Contain HTTP endpoint code
- Render responses
- Contain UI logic

---

# Standard Structure

Orchestrators/

├── DocumentIngestionOrchestrator.cs
├── ReportGenerationOrchestrator.cs
└── KnowledgeBaseRefreshOrchestrator.cs

---

# Example

public interface IDocumentIngestionOrchestrator
{
Task ExecuteAsync(
Guid documentId,
CancellationToken cancellationToken);
}

---

# Rules

Use orchestration when:

- More than one agent participates
- Workflow has multiple stages
- Retry logic is required

Do not create orchestrators for simple one-step operations.

---

# Error Handling

Workflows should:

- Log failures
- Support retries
- Support compensation when needed

---

# Background Processing

Long-running orchestrations should execute through Hangfire.

Examples:

- Embedding generation
- Audio transcription
- Large report generation
- Knowledge base indexing
