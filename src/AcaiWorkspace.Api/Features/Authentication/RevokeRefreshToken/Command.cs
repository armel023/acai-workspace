using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.RevokeRefreshToken;

public sealed record Command(string RefreshToken) : IRequest<Response>;
