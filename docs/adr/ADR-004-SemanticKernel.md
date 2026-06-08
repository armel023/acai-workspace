# ADR-004 - Use Semantic Kernel

## Status

Accepted

## Date

2026-06-08

---

## Context

Acai Workspace requires:

- Multi-agent workflows
- Prompt management
- AI orchestration
- Tool calling
- Future support for multiple LLM providers

Candidate frameworks:

- Semantic Kernel
- LangChain
- LangGraph
- Direct SDK integration

---

## Decision

Use Microsoft Semantic Kernel as the AI orchestration framework.

Semantic Kernel will be used for:

- Agents
- Prompt execution
- Tool invocation
- AI workflows
- Memory integration

---

## Consequences

### Positive

- Native .NET ecosystem support
- Strong Microsoft backing
- Supports multiple model providers
- Agent-oriented design
- Easy integration with ASP.NET Core

### Negative

- Framework evolves rapidly
- Requires understanding of Semantic Kernel concepts

---

## Alternatives Considered

### LangChain

Rejected because the project is primarily .NET based.

### Direct OpenAI SDK

Rejected because orchestration requirements would need to be built manually.

### LangGraph

Rejected due to preference for a native .NET ecosystem.
