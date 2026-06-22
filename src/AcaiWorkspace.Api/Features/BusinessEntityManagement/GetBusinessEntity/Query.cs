using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.GetBusinessEntity;

public sealed record Query(Guid Id) : IRequest<Response?>;
