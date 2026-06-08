using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.GetUser;

public sealed class Handler : IRequestHandler<Query, Response?>
{
    private readonly AcaiWorkspaceDbContext _dbContext;

    public Handler(AcaiWorkspaceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
    {
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
