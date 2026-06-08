using MediatR;

namespace AcaiWorkspace.Api.Features.UserManagement.CreateUser;

public sealed record Command(
    string FirstName,
    string LastName,
    string Email,
    string Username,
    string CreatedBy) : IRequest<Response>;
