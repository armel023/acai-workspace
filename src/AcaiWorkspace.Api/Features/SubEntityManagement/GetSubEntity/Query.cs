using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.GetSubEntity;

public sealed record Query(Guid Id) : IRequest<Response?>;
