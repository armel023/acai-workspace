using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.SearchUserAssignment;

public sealed record Query(
    string? Search,
    Guid? UserId,
    Guid? RoleId,
    Guid? BusinessEntityId,
    Guid? SubEntityId,
    bool? IsActive,
    DateTimeOffset? CreatedAtFrom,
    DateTimeOffset? CreatedAtTo,
    DateTimeOffset? ModifiedAtFrom,
    DateTimeOffset? ModifiedAtTo,
    string? SortBy,
    string? Direction,
    int Page = 1,
    int PageSize = 20) : IRequest<Response>;
