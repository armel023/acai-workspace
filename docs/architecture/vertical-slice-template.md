# Vertical Slice Template

## Purpose

This document defines the standard Vertical Slice Architecture pattern used throughout Acai Workspace.

All new features must follow this structure unless there is a compelling architectural reason to do otherwise.

---

# Guiding Principles

## Feature First

Organize code by business capability and use case.

Good:

```text
Features/
├── Templates/
├── Documents/
├── Chat/
├── Audio/
├── Images/
```

Bad:

```text
Controllers/
Services/
Repositories/
Models/
Validators/
```

Related files must live together.

---

## Thin Endpoints

Endpoints should only:

- Receive requests
- Delegate to MediatR
- Return results

Endpoints must not contain:

- Business logic
- Validation logic
- Database access
- AI orchestration

---

## CQRS

Commands modify state.

Queries read state.

Every use case should be represented by either:

- Command
- Query

---

## Validation

Validation belongs in FluentValidation validators.

Do not manually validate requests inside endpoints or handlers.

---

## EF Core

Handlers may access DbContext directly.

Do not create generic repositories.

Prefer EF Core directly.

---

# Standard Feature Structure

Every feature follows this structure.

```text
Features/
└── Templates/
    └── CreateTemplate/
        ├── Endpoint.cs
        ├── Command.cs
        ├── Handler.cs
        ├── Validator.cs
        └── Response.cs
```

---

# Endpoint

Responsibilities:

- Define route
- Accept request
- Call MediatR
- Return response

Example:

```csharp
public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(
            "/api/templates",
            async (
                CreateTemplateCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);

                return Results.Ok(result);
            })
            .WithName("CreateTemplate")
            .WithTags("Templates");
    }
}
```

Rules:

- No business logic
- No validation
- No database access

---

# Command

Represents the intent to change state.

Example:

```csharp
public sealed record CreateTemplateCommand(
    string Name,
    string Description)
    : IRequest<CreateTemplateResponse>;
```

Rules:

- Immutable
- Simple
- No behavior

---

# Query

Represents a read operation.

Example:

```csharp
public sealed record GetTemplateByIdQuery(
    Guid Id)
    : IRequest<TemplateResponse>;
```

Rules:

- Read only
- No side effects

---

# Validator

Contains all request validation.

Example:

```csharp
public sealed class Validator
    : AbstractValidator<CreateTemplateCommand>
{
    public Validator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Description)
            .MaximumLength(1000);
    }
}
```

Rules:

- Validation only
- No database writes
- No business logic

---

# Handler

Contains use case logic.

Example:

```csharp
public sealed class Handler
    : IRequestHandler<
        CreateTemplateCommand,
        CreateTemplateResponse>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<Handler> _logger;

    public Handler(
        ApplicationDbContext dbContext,
        ILogger<Handler> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<CreateTemplateResponse> Handle(
        CreateTemplateCommand request,
        CancellationToken cancellationToken)
    {
        var template = new ReportTemplate
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description
        };

        _dbContext.ReportTemplates.Add(template);

        await _dbContext.SaveChangesAsync(
            cancellationToken);

        return new CreateTemplateResponse(
            template.Id,
            template.Name);
    }
}
```

Rules:

- Business logic belongs here
- Use dependency injection
- Use async/await
- Pass CancellationToken
- Log meaningful events

---

# Response

Defines API response shape.

Example:

```csharp
public sealed record CreateTemplateResponse(
    Guid Id,
    string Name);
```

Rules:

- Do not expose EF entities
- Return DTOs only

---

# Query Example

Structure:

```text
Features/
└── Templates/
    └── GetTemplateById/
        ├── Endpoint.cs
        ├── Query.cs
        ├── Handler.cs
        └── Response.cs
```

Example Handler:

```csharp
public sealed class Handler
    : IRequestHandler<
        GetTemplateByIdQuery,
        TemplateResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public Handler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TemplateResponse> Handle(
        GetTemplateByIdQuery request,
        CancellationToken cancellationToken)
    {
        return await _dbContext.ReportTemplates
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new TemplateResponse(
                x.Id,
                x.Name))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
```

Rules:

- Use AsNoTracking
- Project to DTO
- Avoid loading entire entities

---

# AI Feature Example

Example:

```text
Features/
└── Documents/
    └── GenerateSummary/
        ├── Endpoint.cs
        ├── Command.cs
        ├── Handler.cs
        ├── Validator.cs
        └── Response.cs
```

Handler responsibilities:

- Retrieve document
- Call DocumentAgent
- Generate summary
- Return response

AI integration belongs in handlers and orchestrators.

Do not call Semantic Kernel directly from endpoints.

---

# Orchestrator Pattern

Use orchestrators when multiple agents participate.

Example:

```text
Document Upload
    ↓
DocumentAgent
    ↓
KnowledgeAgent
    ↓
ReportAgent
```

Example:

```text
Orchestrators/
└── DocumentIngestionOrchestrator.cs
```

Responsibilities:

- Coordinate workflows
- Manage execution order
- Handle failures

Orchestrators should not contain endpoint code.

---

# Agent Pattern

Agents belong in:

```text
Agents/
```

Examples:

```text
KnowledgeAgent
DocumentAgent
AudioAgent
ImageAgent
ReportAgent
```

Responsibilities:

- Encapsulate AI capabilities
- Interact with Semantic Kernel
- Remain focused on one concern

---

# Naming Conventions

Commands:

```text
CreateTemplateCommand
DeleteTemplateCommand
GenerateReportCommand
```

Queries:

```text
GetTemplateByIdQuery
GetConversationQuery
SearchKnowledgeBaseQuery
```

Handlers:

```text
Handler
```

Validators:

```text
Validator
```

Endpoints:

```text
Endpoint
```

Responses:

```text
TemplateResponse
CreateTemplateResponse
```

---

# Checklist

Before creating a new feature:

- Endpoint exists
- Command or Query exists
- Validator exists
- Handler exists
- Response exists
- Uses MediatR
- Uses CancellationToken
- Uses logging when appropriate
- Returns DTOs
- No business logic in endpoint
- No generic repository
- Uses EF Core directly
- Follows Vertical Slice structure

If all boxes are checked, the feature complies with Acai Workspace architecture.
