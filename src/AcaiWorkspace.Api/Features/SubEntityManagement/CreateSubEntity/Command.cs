using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.CreateSubEntity;

public sealed record Command(
    Guid BusinessEntityId,
    string Name,
    string Code,
    string? Description,
    string? CreatedBy) : IRequest<Response>;
