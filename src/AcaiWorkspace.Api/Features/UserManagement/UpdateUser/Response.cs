namespace AcaiWorkspace.Api.Features.UserManagement.UpdateUser;

public sealed record Response(
    Guid Id,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string Username,
    DateTime? ModifiedAt,
    string? ModifiedBy);
