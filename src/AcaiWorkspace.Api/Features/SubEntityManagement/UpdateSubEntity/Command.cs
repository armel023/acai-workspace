using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.UpdateSubEntity;

public sealed record Command(
    Guid Id,
    Guid BusinessEntityId,
    string Name,
    string Code,
    string? Description,
    string? ModifiedBy) : IRequest<Response?>;
