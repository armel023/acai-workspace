using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.DeleteUser;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiWorkspaceDbContext _dbContext;

    public Handler(AcaiWorkspaceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (user is null)
        {
            return new Response(false);
        }

        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true);
    }
}
