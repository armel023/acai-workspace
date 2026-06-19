using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.DeleteUser;

public sealed class Handler : IRequestHandler<Command, Response>
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

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (user is null)
        {
            return new Response(false);
        }

        _authorizationService.EnsureCanDeleteUser(user);

        user.DeletedAt = DateTimeOffset.UtcNow;
        user.DeletedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
            ? _currentUser.UserName
            : "system";
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true);
    }
}
