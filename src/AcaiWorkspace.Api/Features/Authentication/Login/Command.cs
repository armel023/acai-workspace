using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.Login;

public sealed record Command(string Email, string Password, bool UseCookie = false) : IRequest<Response>;
