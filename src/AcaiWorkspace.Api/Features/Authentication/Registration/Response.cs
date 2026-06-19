namespace AcaiWorkspace.Api.Features.Authentication.Registration;

public sealed record Response(
    Guid UserId,
    string FullName,
    string Email,
    string UserName,
    DateTime CreatedAtUtc);
