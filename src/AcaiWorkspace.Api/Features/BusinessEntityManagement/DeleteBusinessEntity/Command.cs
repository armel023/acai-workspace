using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.DeleteBusinessEntity;

public sealed record Command(Guid Id) : IRequest<Response>;
