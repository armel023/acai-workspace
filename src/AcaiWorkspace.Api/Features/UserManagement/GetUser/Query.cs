using MediatR;

namespace AcaiWorkspace.Api.Features.UserManagement.GetUser;

public sealed record Query(Guid Id) : IRequest<Response?>;
