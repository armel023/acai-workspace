using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.UpdateBusinessEntity;

public sealed record Command(
    Guid Id,
    string Name,
    string Code,
    string? Description,
    string? ModifiedBy) : IRequest<Response?>;
