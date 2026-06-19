using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.UpdateUser;

public sealed class Handler : IRequestHandler<Command, Response?>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IAuthorizationService _authorizationService;
    private readonly ICurrentUser _currentUser;

    public Handler(
        AcaiDbContext dbContext,
        IAuthorizationService authorizationService,
        ICurrentUser currentUser)
    {
        _dbContext = dbContext;
        _authorizationService = authorizationService;
        _currentUser = currentUser;
    }

    public async Task<Response?> Handle(Command request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (user is null)
        {
            return null;
        }

        _authorizationService.EnsureCanUpdateUser(user);

        var duplicateEmail = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Id != request.Id && x.Email == request.Email, cancellationToken);

        if (duplicateEmail)
        {
            throw new InvalidOperationException("A user with this email already exists.");
        }

        var duplicateUsername = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Id != request.Id && x.UserName == request.Username, cancellationToken);

        if (duplicateUsername)
        {
            throw new InvalidOperationException("A user with this username already exists.");
        }

        user.FirstName = request.FirstName.Trim();
        user.LastName = request.LastName.Trim();
        user.Email = request.Email.Trim().ToLowerInvariant();
        user.UserName = request.Username.Trim();
        user.ModifiedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
            ? _currentUser.UserName
            : request.ModifiedBy?.Trim() ?? "system";
        user.UpdateNames();

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            user.Id,
            user.FirstName,
            user.LastName,
            user.FullName,
            user.Email,
            user.UserName ?? string.Empty,
            user.ModifiedAt,
            user.ModifiedBy);
    }
}
