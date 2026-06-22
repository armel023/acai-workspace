namespace AcaiWorkspace.Api.Features.SubEntityManagement.CreateSubEntity;

public sealed record Response(
    Guid Id,
    Guid BusinessEntityId,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? CreatedAt,
    string? CreatedBy);
