using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.DeleteSubEntity;

public sealed record Command(Guid Id) : IRequest<Response>;
