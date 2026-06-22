using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.DeleteUserAssignment;

public sealed record Command(Guid Id) : IRequest<Response>;
