namespace AcaiWorkspace.Api.Features.SubEntityManagement.SearchSubEntity;

public sealed record Response(
    IReadOnlyCollection<ResponseItem> Items,
    int Page,
    int PageSize,
    int TotalCount);

public sealed record ResponseItem(
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
