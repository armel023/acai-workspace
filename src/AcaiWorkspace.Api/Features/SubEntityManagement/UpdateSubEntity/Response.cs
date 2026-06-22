namespace AcaiWorkspace.Api.Features.SubEntityManagement.UpdateSubEntity;

public sealed record Response(
    Guid Id,
    Guid BusinessEntityId,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
