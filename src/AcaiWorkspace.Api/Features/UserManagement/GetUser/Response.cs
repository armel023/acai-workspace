namespace AcaiWorkspace.Api.Features.UserManagement.GetUser;

public sealed record Response(
    Guid Id,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string Username,
    DateTimeOffset? CreatedAt,
    string? CreatedBy,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
