# API Standards

## Purpose

Defines API conventions for Acai Workspace.

All endpoints must follow these standards.

---

# Endpoint Naming

Good:

GET /api/templates

GET /api/templates/{id}

POST /api/templates

PUT /api/templates/{id}

DELETE /api/templates/{id}

Bad:

GET /api/getTemplates

POST /api/createTemplate

---

# Response Format

Success:

{
"data": {}
}

Collection:

{
"items": [],
"totalCount": 100,
"page": 1,
"pageSize": 20
}

Error:

{
"code": "validation_error",
"message": "Name is required"
}

---

# Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

500 Internal Server Error

---

# Pagination

Use:

?page=1&pageSize=20

Response:

{
"items": [],
"page": 1,
"pageSize": 20,
"totalCount": 100
}

---

# Filtering

Use query parameters.

Example:

GET /api/documents?status=completed

---

# Sorting

Example:

GET /api/documents?sortBy=createdAt&direction=desc

---

# DTO Rules

Never expose EF entities.

Always return DTOs.

---

# Validation

Use FluentValidation.

Do not use DataAnnotations.

---

# Versioning

Future version format:

/api/v1/templates

---

# OpenAPI

Every endpoint should:

- Have tags
- Have summaries
- Have response documentation
