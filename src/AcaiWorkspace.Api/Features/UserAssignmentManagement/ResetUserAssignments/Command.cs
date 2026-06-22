using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.ResetUserAssignments;

public sealed record Command(Guid UserId, string? ModifiedBy = null) : IRequest<Response>;
