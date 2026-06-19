using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Domain.Entities.Identity;

namespace AcaiWorkspace.Api.Identity;

public interface IJwtTokenService
{
    Task<AccessTokenResult> CreateAccessTokenAsync(AcaiUser user, CancellationToken cancellationToken);
    RefreshTokenResult GenerateRefreshToken();
    string HashToken(string token);
}

public sealed record AccessTokenResult(string Token, DateTime ExpiresAtUtc);

public sealed record RefreshTokenResult(string Token, DateTime ExpiresAtUtc);

public sealed class JwtTokenService : IJwtTokenService
{
    private readonly JwtOptions _jwtOptions;
    private readonly UserManager<AcaiUser> _userManager;

    public JwtTokenService(IOptions<JwtOptions> jwtOptions, UserManager<AcaiUser> userManager)
    {
        _jwtOptions = jwtOptions.Value;
        _userManager = userManager;
    }

    public async Task<AccessTokenResult> CreateAccessTokenAsync(AcaiUser user, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var expiresAt = now.AddMinutes(_jwtOptions.AccessTokenMinutes);
        var roles = await _userManager.GetRolesAsync(user);
        var permissionClaims = await _userManager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName ?? string.Empty),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(AcaiClaimTypes.BusinessEntityId, user.BusinessEntityId?.ToString() ?? string.Empty),
            new(AcaiClaimTypes.SubEntityId, user.SubEntityId?.ToString() ?? string.Empty)
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        claims.AddRange(permissionClaims.Where(x => x.Type == AcaiClaimTypes.Permission));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            notBefore: now,
            expires: expiresAt,
            signingCredentials: credentials);

        var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        return new AccessTokenResult(token, expiresAt);
    }

    public RefreshTokenResult GenerateRefreshToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        var token = Convert.ToBase64String(bytes);
        return new RefreshTokenResult(token, DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenDays));
    }

    public string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes);
    }
}
