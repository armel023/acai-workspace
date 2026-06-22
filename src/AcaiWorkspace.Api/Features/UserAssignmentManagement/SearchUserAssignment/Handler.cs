using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.SearchUserAssignment;

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
        _permissionService.RequirePermission(Permissions.UserAssignmentManagement.AssignmentsRead);

        var query = _dbContext.UserAssignments
            .AsNoTracking()
            .Include(x => x.User)
            .Include(x => x.Role)
            .Include(x => x.BusinessEntity)
            .Include(x => x.SubEntity)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim().ToLowerInvariant();
            query = query.Where(x =>
                x.User.FullName.ToLower().Contains(search)
                || (x.User.Email ?? string.Empty).ToLower().Contains(search)
                || (x.User.UserName ?? string.Empty).ToLower().Contains(search)
                || (x.Role.Name ?? string.Empty).ToLower().Contains(search)
                || (x.BusinessEntity != null && x.BusinessEntity.Name.ToLower().Contains(search))
                || (x.SubEntity != null && x.SubEntity.Name.ToLower().Contains(search))
                || (x.CreatedBy ?? string.Empty).ToLower().Contains(search)
                || (x.ModifiedBy ?? string.Empty).ToLower().Contains(search));
        }

        if (request.UserId.HasValue)
        {
            query = query.Where(x => x.UserId == request.UserId.Value);
        }

        if (request.RoleId.HasValue)
        {
            query = query.Where(x => x.RoleId == request.RoleId.Value);
        }

        if (request.BusinessEntityId.HasValue)
        {
            query = query.Where(x => x.BusinessEntityId == request.BusinessEntityId.Value);
        }

        if (request.SubEntityId.HasValue)
        {
            query = query.Where(x => x.SubEntityId == request.SubEntityId.Value);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(x => x.IsActive == request.IsActive.Value);
        }

        if (request.CreatedAtFrom.HasValue)
        {
            query = query.Where(x => x.CreatedAt >= request.CreatedAtFrom.Value);
        }

        if (request.CreatedAtTo.HasValue)
        {
            query = query.Where(x => x.CreatedAt <= request.CreatedAtTo.Value);
        }

        if (request.ModifiedAtFrom.HasValue)
        {
            query = query.Where(x => x.ModifiedAt >= request.ModifiedAtFrom.Value);
        }

        if (request.ModifiedAtTo.HasValue)
        {
            query = query.Where(x => x.ModifiedAt <= request.ModifiedAtTo.Value);
        }

        var sortBy = request.SortBy?.Trim().ToLowerInvariant() ?? "createdat";
        var direction = request.Direction?.Trim().ToLowerInvariant() ?? "desc";
        var isAsc = direction == "asc";

        query = (sortBy, isAsc) switch
        {
            ("userdisplayname", true) => query.OrderBy(x => x.User.FullName),
            ("userdisplayname", false) => query.OrderByDescending(x => x.User.FullName),
            ("useremail", true) => query.OrderBy(x => x.User.Email),
            ("useremail", false) => query.OrderByDescending(x => x.User.Email),
            ("username", true) => query.OrderBy(x => x.User.UserName),
            ("username", false) => query.OrderByDescending(x => x.User.UserName),
            ("role", true) => query.OrderBy(x => x.Role.Name),
            ("role", false) => query.OrderByDescending(x => x.Role.Name),
            ("businessentityname", true) => query.OrderBy(x => x.BusinessEntity != null ? x.BusinessEntity.Name : string.Empty),
            ("businessentityname", false) => query.OrderByDescending(x => x.BusinessEntity != null ? x.BusinessEntity.Name : string.Empty),
            ("subentityname", true) => query.OrderBy(x => x.SubEntity != null ? x.SubEntity.Name : string.Empty),
            ("subentityname", false) => query.OrderByDescending(x => x.SubEntity != null ? x.SubEntity.Name : string.Empty),
            ("modifiedat", true) => query.OrderBy(x => x.ModifiedAt),
            ("modifiedat", false) => query.OrderByDescending(x => x.ModifiedAt),
            ("createdat", true) => query.OrderBy(x => x.CreatedAt),
            _ => query.OrderByDescending(x => x.CreatedAt)
        };

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new ResponseItem(
                x.Id,
                x.UserId,
                x.User.FullName,
                x.User.Email ?? string.Empty,
                x.User.UserName ?? string.Empty,
                x.RoleId,
                x.Role.Name ?? string.Empty,
                x.BusinessEntityId,
                x.BusinessEntity != null ? x.BusinessEntity.Name : null,
                x.SubEntityId,
                x.SubEntity != null ? x.SubEntity.Name : null,
                x.IsActive,
                x.CreatedAt,
                x.CreatedBy,
                x.ModifiedAt,
                x.ModifiedBy))
            .ToListAsync(cancellationToken);

        return new Response(items, request.Page, request.PageSize, totalCount);
    }
}
