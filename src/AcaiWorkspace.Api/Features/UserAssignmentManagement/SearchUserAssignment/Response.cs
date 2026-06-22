namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.SearchUserAssignment;

public sealed record Response(
    IReadOnlyCollection<ResponseItem> Items,
    int Page,
    int PageSize,
    int TotalCount);

public sealed record ResponseItem(
    Guid Id,
    Guid UserId,
    string UserDisplayName,
    string UserEmail,
    string UserName,
    Guid RoleId,
    string Role,
    Guid? BusinessEntityId,
    string? BusinessEntityName,
    Guid? SubEntityId,
    string? SubEntityName,
    bool IsActive,
    DateTimeOffset? CreatedAt,
    string? CreatedBy,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
