using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.CreateBusinessEntity;

public sealed record Command(
    string Name,
    string Code,
    string? Description,
    string? CreatedBy) : IRequest<Response>;
