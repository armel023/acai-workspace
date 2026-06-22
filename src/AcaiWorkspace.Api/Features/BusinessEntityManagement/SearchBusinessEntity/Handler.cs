using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.SearchBusinessEntity;

public sealed class Handler : IRequestHandler<Query, Response>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IPermissionService _permissionService;

    public Handler(AcaiDbContext dbContext, IPermissionService permissionService)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
    }

    public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.BusinessEntityManagement.BusinessEntitiesRead);

        var query = _dbContext.BusinessEntities
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim().ToLowerInvariant();
            query = query.Where(x =>
                x.Name.ToLower().Contains(search)
                || x.Code.ToLower().Contains(search)
                || (x.Description ?? string.Empty).ToLower().Contains(search));
        }

        if (request.CreatedAtFrom.HasValue)
        {
            query = query.Where(x => x.CreatedAt >= request.CreatedAtFrom.Value);
        }

        if (request.CreatedAtTo.HasValue)
        {
            query = query.Where(x => x.CreatedAt <= request.CreatedAtTo.Value);
        }

        var sortBy = request.SortBy?.Trim().ToLowerInvariant() ?? "createdat";
        var direction = request.Direction?.Trim().ToLowerInvariant() ?? "desc";
        var isAsc = direction == "asc";

        query = (sortBy, isAsc) switch
        {
            ("name", true) => query.OrderBy(x => x.Name),
            ("name", false) => query.OrderByDescending(x => x.Name),
            ("code", true) => query.OrderBy(x => x.Code),
            ("code", false) => query.OrderByDescending(x => x.Code),
            ("createdat", true) => query.OrderBy(x => x.CreatedAt),
            _ => query.OrderByDescending(x => x.CreatedAt)
        };

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new ResponseItem(
                x.Id,
                x.Name,
                x.Code,
                x.Description,
                x.CreatedAt,
                x.CreatedBy,
                x.ModifiedAt,
                x.ModifiedBy))
            .ToListAsync(cancellationToken);

        return new Response(items, request.Page, request.PageSize, totalCount);
    }
}
