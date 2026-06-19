using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.SearchUser;

public sealed class Handler : IRequestHandler<Query, Response>
{
    private readonly AcaiWorkspaceDbContext _dbContext;
    private readonly IPermissionService _permissionService;
    private readonly ICurrentUser _currentUser;

    public Handler(
        AcaiWorkspaceDbContext dbContext,
        IPermissionService permissionService,
        ICurrentUser currentUser)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
        _currentUser = currentUser;
    }

    public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
    {
        var usersQuery = _dbContext.Users
            .AsNoTracking()
            .AsQueryable();

        var canReadAllUsers = _permissionService.HasPermission(Permissions.UserManagement.UsersRead);
        if (!canReadAllUsers)
        {
            _permissionService.RequirePermission(Permissions.UserManagement.UserRead);

            if (!_currentUser.UserId.HasValue)
            {
                throw new UnauthorizedAccessException("Forbidden: missing authenticated user context.");
            }

            var currentUserId = _currentUser.UserId.Value;
            usersQuery = usersQuery.Where(x => x.Id == currentUserId);
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim().ToLowerInvariant();
            usersQuery = usersQuery.Where(x =>
                x.FullName.ToLower().Contains(search)
                || x.Email.ToLower().Contains(search)
                || x.Username.ToLower().Contains(search));
        }

        if (request.CreatedAtFrom.HasValue)
        {
            usersQuery = usersQuery.Where(x => x.CreatedAt >= request.CreatedAtFrom.Value);
        }

        if (request.CreatedAtTo.HasValue)
        {
            usersQuery = usersQuery.Where(x => x.CreatedAt <= request.CreatedAtTo.Value);
        }

        var sortBy = request.SortBy?.Trim().ToLowerInvariant() ?? "createdat";
        var direction = request.Direction?.Trim().ToLowerInvariant() ?? "desc";
        var isAsc = direction == "asc";

        usersQuery = (sortBy, isAsc) switch
        {
            ("firstname", true) => usersQuery.OrderBy(x => x.FirstName),
            ("firstname", false) => usersQuery.OrderByDescending(x => x.FirstName),
            ("lastname", true) => usersQuery.OrderBy(x => x.LastName),
            ("lastname", false) => usersQuery.OrderByDescending(x => x.LastName),
            ("createdat", true) => usersQuery.OrderBy(x => x.CreatedAt),
            _ => usersQuery.OrderByDescending(x => x.CreatedAt)
        };

        var totalCount = await usersQuery.CountAsync(cancellationToken);

        var items = await usersQuery
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new ResponseItem(
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
            .ToListAsync(cancellationToken);

        return new Response(items, request.Page, request.PageSize, totalCount);
    }
}
