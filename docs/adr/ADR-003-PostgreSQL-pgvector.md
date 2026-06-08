# ADR-003 - Use PostgreSQL with pgvector

## Status

Accepted

## Date

2026-06-08

---

## Context

Acai Workspace requires:

- Relational data storage
- Embedding storage
- Vector similarity search
- Cloud deployment
- Cost efficiency

Potential options:

- PostgreSQL + pgvector
- Pinecone
- Qdrant
- Weaviate
- Azure AI Search

---

## Decision

Use PostgreSQL as the primary database.

Use pgvector for vector storage.

Store:

- Users
- Documents
- Conversations
- Templates
- Reports
- Embeddings

within a single database platform.

---

## Consequences

### Positive

- Single operational database
- Lower deployment complexity
- Lower cost
- Easier local development
- Strong EF Core support

### Negative

- Dedicated vector databases may outperform pgvector at very large scale

---

## Alternatives Considered

### Pinecone

Rejected due to additional infrastructure and cost.

### Qdrant

Rejected initially to reduce operational complexity.

### Weaviate

Rejected initially due to deployment complexity.
