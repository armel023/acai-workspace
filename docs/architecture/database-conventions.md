# Database Conventions

## Primary Database

PostgreSQL

## Vector Database

pgvector extension on PostgreSQL

---

# Naming

Tables:

users

documents

knowledge_chunks

report_templates

generated_reports

Good:

snake_case

Bad:

tblUsers

UserTable

---

# Primary Keys

Use UUIDs.

Example:

id UUID PRIMARY KEY

---

# Audit Fields

Every aggregate root should contain:

created_at

created_by

updated_at

updated_by

---

# Soft Delete

When required:

deleted_at

Avoid physical deletes when historical data matters.

---

# EF Core Configuration

Use:

IEntityTypeConfiguration<T>

Example:

DocumentConfiguration

TemplateConfiguration

Do not place configurations inside DbContext.

---

# Migrations

Rules:

One feature per migration.

Good:

AddReportTemplates

AddKnowledgeChunks

Bad:

Migration1

Migration2

---

# Indexes

Create indexes for:

- Foreign keys
- Search fields
- Vector search columns

---

# Vector Storage

Store embeddings using pgvector.

Example:

knowledge_chunks

- id
- document_id
- content
- embedding

---

# Transactions

Use transactions when multiple aggregates are updated together.

Avoid unnecessary transactions.

---

# Performance

Use:

AsNoTracking()

For read-only queries.

Always project to DTOs when possible.
