using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.UpdateUserAssignment;

public sealed record Command(
    Guid Id,
    Guid UserId,
    Guid? BusinessEntityId,
    Guid? SubEntityId,
    Guid RoleId,
    bool IsActive,
    string? ModifiedBy = null) : IRequest<Response?>;
