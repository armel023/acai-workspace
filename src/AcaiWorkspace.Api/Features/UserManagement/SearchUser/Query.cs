using MediatR;

namespace AcaiWorkspace.Api.Features.UserManagement.SearchUser;

public sealed record Query(
    string? Search,
    DateTimeOffset? CreatedAtFrom,
    DateTimeOffset? CreatedAtTo,
    string? SortBy,
    string? Direction,
    int Page = 1,
    int PageSize = 20) : IRequest<Response>;
