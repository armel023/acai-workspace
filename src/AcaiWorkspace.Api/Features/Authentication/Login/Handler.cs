using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity;
using AcaiWorkspace.Domain.Entities.Identity;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.Authentication.Login;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly UserManager<AcaiUser> _userManager;
    private readonly SignInManager<AcaiUser> _signInManager;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly AcaiDbContext _dbContext;

    public Handler(
        UserManager<AcaiUser> userManager,
        SignInManager<AcaiUser> signInManager,
        IJwtTokenService jwtTokenService,
        AcaiDbContext dbContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtTokenService = jwtTokenService;
        _dbContext = dbContext;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == email, cancellationToken);

        if (user is null)
        {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        var passwordResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
        if (!passwordResult.Succeeded)
        {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        if (request.UseCookie)
        {
            await _signInManager.SignInAsync(user, isPersistent: true);
        }

        var accessToken = await _jwtTokenService.CreateAccessTokenAsync(user, cancellationToken);
        var refreshToken = _jwtTokenService.GenerateRefreshToken();
        var refreshTokenHash = _jwtTokenService.HashToken(refreshToken.Token);

        var existingTokens = await _dbContext.RefreshTokens
            .Where(x => x.UserId == user.Id && x.RevokedAtUtc == null && x.ExpiresAtUtc > DateTime.UtcNow)
            .ToListAsync(cancellationToken);

        foreach (var token in existingTokens)
        {
            token.RevokedAtUtc = DateTime.UtcNow;
        }

        _dbContext.RefreshTokens.Add(new AcaiRefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = refreshTokenHash,
            CreatedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = refreshToken.ExpiresAtUtc
        });

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            accessToken.Token,
            accessToken.ExpiresAtUtc,
            refreshToken.Token,
            refreshToken.ExpiresAtUtc,
            user.Id,
            user.UserName ?? string.Empty,
            user.Email ?? string.Empty);
    }
}
