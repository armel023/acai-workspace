using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.SearchUser;

public sealed class Handler : IRequestHandler<Query, Response>
{
    private readonly AcaiWorkspaceDbContext _dbContext;

    public Handler(AcaiWorkspaceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
    {
        var usersQuery = _dbContext.Users
            .AsNoTracking()
            .AsQueryable();

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
