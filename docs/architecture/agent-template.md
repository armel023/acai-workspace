# Agent Development Template

## Purpose

Agents encapsulate AI capabilities and business-specific intelligence.

Agents are responsible for interacting with Semantic Kernel, LLMs, prompts, vector stores, and AI workflows.

Agents are not HTTP endpoints.

Agents are not orchestrators.

Each agent should have a single responsibility.

---

# Agent Principles

One Agent = One Capability

Good:

- KnowledgeAgent
- DocumentAgent
- AudioAgent
- ImageAgent
- ReportAgent

Bad:

- AiAgent
- SuperAgent
- UniversalAgent

---

# Standard Structure

Agents/

KnowledgeAgent/

├── IKnowledgeAgent.cs
├── KnowledgeAgent.cs
├── Prompts/
├── Models/
└── Settings/

---

# Responsibilities

Agents may:

- Use Semantic Kernel
- Call AI models
- Execute prompts
- Generate summaries
- Generate reports
- Extract information
- Perform retrieval

Agents must not:

- Access HTTP Context
- Return IResult
- Contain endpoint logic
- Perform database migrations

---

# Interface Example

public interface IKnowledgeAgent
{
Task<string> AnswerQuestionAsync(
string question,
CancellationToken cancellationToken);
}

---

# Implementation Rules

Always:

- Use async/await
- Use CancellationToken
- Use ILogger
- Return strongly typed results when possible

Avoid:

- Static classes
- Global state
- Hardcoded prompts

---

# Prompt Organization

Prompts/

├── AnswerQuestion.txt
├── SummarizeDocument.txt
├── GenerateReport.txt

Store prompts separately whenever possible.

---

# Logging

Log:

- AI request start
- AI request completion
- Token usage
- Failures

Never log:

- API keys
- Secrets
- Sensitive user data

---

# Testing

Test:

- Prompt execution
- Error handling
- Structured outputs

Mock:

- Semantic Kernel
- External AI services

Never call production AI services in unit tests.
