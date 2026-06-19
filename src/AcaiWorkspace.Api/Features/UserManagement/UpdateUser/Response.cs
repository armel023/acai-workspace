namespace AcaiWorkspace.Api.Features.UserManagement.UpdateUser;

public sealed record Response(
    Guid Id,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string Username,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
