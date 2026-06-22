using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.GetSubEntity;

public sealed class Handler : IRequestHandler<Query, Response?>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IPermissionService _permissionService;

    public Handler(AcaiDbContext dbContext, IPermissionService permissionService)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
    }

    public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.SubEntityManagement.SubEntitiesRead);

        return await _dbContext.SubEntities
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new Response(
                x.Id,
                x.BusinessEntityId,
                x.BusinessEntity.Name,
                x.Name,
                x.Code,
                x.Description,
                x.CreatedAt,
                x.CreatedBy,
                x.ModifiedAt,
                x.ModifiedBy))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
