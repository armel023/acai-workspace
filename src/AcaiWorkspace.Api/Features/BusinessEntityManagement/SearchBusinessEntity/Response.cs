namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.SearchBusinessEntity;

public sealed record Response(
    IReadOnlyCollection<ResponseItem> Items,
    int Page,
    int PageSize,
    int TotalCount);

public sealed record ResponseItem(
    Guid Id,
    string Name,
    string Code,
    string? Description,
    DateTimeOffset? CreatedAt,
    string? CreatedBy,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
