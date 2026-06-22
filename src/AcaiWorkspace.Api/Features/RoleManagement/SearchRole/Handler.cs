using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Api.Features.RoleManagement.SearchRole;

public sealed class Handler : IRequestHandler<Query, IReadOnlyCollection<ResponseItem>>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IPermissionService _permissionService;

    public Handler(AcaiDbContext dbContext, IPermissionService permissionService)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
    }

    public async Task<IReadOnlyCollection<ResponseItem>> Handle(Query request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.RoleManagement.RolesRead);

        var items = await _dbContext.Roles
            .AsNoTracking()
            .Where(x => x.Name != null)
            .OrderBy(x => x.Name)
            .Select(x => new ResponseItem(x.Id, x.Name!))
            .ToListAsync(cancellationToken);

        return items;
    }
}
