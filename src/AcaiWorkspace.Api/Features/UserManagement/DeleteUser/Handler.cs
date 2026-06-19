using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.DeleteUser;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiWorkspaceDbContext _dbContext;
    private readonly IAuthorizationService _authorizationService;

    public Handler(AcaiWorkspaceDbContext dbContext, IAuthorizationService authorizationService)
    {
        _dbContext = dbContext;
        _authorizationService = authorizationService;
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

        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true);
    }
}
