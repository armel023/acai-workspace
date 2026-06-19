using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.RefreshToken;

public sealed record Command(string RefreshToken) : IRequest<Response>;
