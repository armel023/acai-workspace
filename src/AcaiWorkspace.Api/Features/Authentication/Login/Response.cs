namespace AcaiWorkspace.Api.Features.Authentication.Login;

public sealed record Response(
    string AccessToken,
    DateTime AccessTokenExpiresAtUtc,
    string RefreshToken,
    DateTime RefreshTokenExpiresAtUtc,
    Guid UserId,
    string UserName,
    string Email);
