namespace AcaiWorkspace.Api.Features.UserManagement.SearchUser;

public sealed record Response(
    IReadOnlyCollection<ResponseItem> Items,
    int Page,
    int PageSize,
    int TotalCount);

public sealed record ResponseItem(
    Guid Id,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string Username,
    DateTime CreatedAt,
    string CreatedBy,
    DateTime? ModifiedAt,
    string? ModifiedBy);
