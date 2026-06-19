using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.Registration;

public sealed record Command(string FirstName, string LastName, string Email, string Password) : IRequest<Response>;
