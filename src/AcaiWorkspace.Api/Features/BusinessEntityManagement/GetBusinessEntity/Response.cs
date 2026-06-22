namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.GetBusinessEntity;

public sealed record Response(
    Guid Id,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? CreatedAt,
    string? CreatedBy,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
