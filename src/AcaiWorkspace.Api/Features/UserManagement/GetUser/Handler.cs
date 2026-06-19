using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.GetUser;

public sealed class Handler : IRequestHandler<Query, Response?>
{
    private readonly AcaiWorkspaceDbContext _dbContext;
    private readonly IAuthorizationService _authorizationService;

    public Handler(AcaiWorkspaceDbContext dbContext, IAuthorizationService authorizationService)
    {
        _dbContext = dbContext;
        _authorizationService = authorizationService;
    }

    public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (user is null)
        {
            return null;
        }

        _authorizationService.EnsureCanReadUser(user);

        return await _dbContext.Users
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new Response(
                x.Id,
                x.FirstName,
                x.LastName,
                x.FullName,
                x.Email,
                x.Username,
                x.CreatedAt,
                x.CreatedBy,
                x.ModifiedAt,
                x.ModifiedBy))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
