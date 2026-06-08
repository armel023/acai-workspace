using MediatR;

namespace AcaiWorkspace.Api.Features.UserManagement.DeleteUser;

public sealed record Command(Guid Id) : IRequest<Response>;
