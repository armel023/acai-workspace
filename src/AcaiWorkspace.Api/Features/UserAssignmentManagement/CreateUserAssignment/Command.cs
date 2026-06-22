using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.CreateUserAssignment;

public sealed record Command(
    Guid UserId,
    Guid? BusinessEntityId,
    Guid? SubEntityId,
    Guid RoleId,
    bool IsActive = true,
    string? CreatedBy = null) : IRequest<Response>;
