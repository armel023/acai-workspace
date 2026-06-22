namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.UpdateBusinessEntity;

public sealed record Response(
    Guid Id,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
