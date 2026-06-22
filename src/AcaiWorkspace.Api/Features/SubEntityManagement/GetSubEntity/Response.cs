namespace AcaiWorkspace.Api.Features.SubEntityManagement.GetSubEntity;

public sealed record Response(
    Guid Id,
    Guid BusinessEntityId,
    string BusinessEntityName,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? CreatedAt,
    string? CreatedBy,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
