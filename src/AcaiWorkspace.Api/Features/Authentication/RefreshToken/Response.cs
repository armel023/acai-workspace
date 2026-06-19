namespace AcaiWorkspace.Api.Features.Authentication.RefreshToken;

public sealed record Response(
    string AccessToken,
    DateTime AccessTokenExpiresAtUtc,
    string RefreshToken,
    DateTime RefreshTokenExpiresAtUtc);
