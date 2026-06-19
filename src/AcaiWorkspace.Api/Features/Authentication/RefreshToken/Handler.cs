using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity;
using AcaiWorkspace.Domain.Entities.Identity;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.Authentication.RefreshToken;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiIdentityDbContext _dbContext;
    private readonly IJwtTokenService _jwtTokenService;

    public Handler(AcaiIdentityDbContext dbContext, IJwtTokenService jwtTokenService)
    {
        _dbContext = dbContext;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var hash = _jwtTokenService.HashToken(request.RefreshToken);
        var storedToken = await _dbContext.RefreshTokens
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.TokenHash == hash, cancellationToken);

        if (storedToken is null || storedToken.RevokedAtUtc is not null || storedToken.ExpiresAtUtc <= DateTime.UtcNow)
        {
            throw new UnauthorizedAccessException("Invalid refresh token.");
        }

        var newRefreshToken = _jwtTokenService.GenerateRefreshToken();
        var newHash = _jwtTokenService.HashToken(newRefreshToken.Token);

        storedToken.RevokedAtUtc = DateTime.UtcNow;
        storedToken.ReplacedByTokenHash = newHash;

        _dbContext.RefreshTokens.Add(new AcaiRefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = storedToken.UserId,
            TokenHash = newHash,
            CreatedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = newRefreshToken.ExpiresAtUtc
        });

        var accessToken = await _jwtTokenService.CreateAccessTokenAsync(storedToken.User, cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            accessToken.Token,
            accessToken.ExpiresAtUtc,
            newRefreshToken.Token,
            newRefreshToken.ExpiresAtUtc);
    }
}
