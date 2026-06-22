using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.DeleteBusinessEntity;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IPermissionService _permissionService;
    private readonly ICurrentUser _currentUser;

    public Handler(AcaiDbContext dbContext, IPermissionService permissionService, ICurrentUser currentUser)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
        _currentUser = currentUser;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.BusinessEntityManagement.BusinessEntitiesDelete);

        var entity = await _dbContext.BusinessEntities
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return new Response(false);
        }

        entity.DeletedAt = DateTimeOffset.UtcNow;
        entity.DeletedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
            ? _currentUser.UserName
            : "system";

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true);
    }
}
