namespace AcaiWorkspace.Api.Features.UserManagement.CreateUser;

public sealed record Response(
    Guid Id,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string Username,
    DateTimeOffset? CreatedAt,
    string? CreatedBy);
