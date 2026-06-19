using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.Authentication.RevokeRefreshToken;

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
        var token = await _dbContext.RefreshTokens.FirstOrDefaultAsync(x => x.TokenHash == hash, cancellationToken);

        if (token is null)
        {
            return new Response(false);
        }

        token.RevokedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true);
    }
}
