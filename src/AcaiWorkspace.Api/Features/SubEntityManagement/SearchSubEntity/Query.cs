using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.SearchSubEntity;

public sealed record Query(
    string? Search,
    Guid? BusinessEntityId,
    DateTimeOffset? CreatedAtFrom,
    DateTimeOffset? CreatedAtTo,
    string? SortBy,
    string? Direction,
    int Page = 1,
    int PageSize = 20) : IRequest<Response>;
