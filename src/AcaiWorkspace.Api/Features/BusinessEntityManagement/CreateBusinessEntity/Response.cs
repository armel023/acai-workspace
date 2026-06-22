namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.CreateBusinessEntity;

public sealed record Response(
    Guid Id,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? CreatedAt,
    string? CreatedBy);
