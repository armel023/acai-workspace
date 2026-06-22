using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.SearchBusinessEntity;

public sealed record Query(
    string? Search,
    DateTimeOffset? CreatedAtFrom,
    DateTimeOffset? CreatedAtTo,
    string? SortBy,
    string? Direction,
    int Page = 1,
    int PageSize = 20) : IRequest<Response>;
