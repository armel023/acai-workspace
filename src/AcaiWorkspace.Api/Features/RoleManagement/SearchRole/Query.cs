using MediatR;

namespace AcaiWorkspace.Api.Features.RoleManagement.SearchRole;

public sealed record Query : IRequest<IReadOnlyCollection<ResponseItem>>;
