using MediatR;

namespace AcaiWorkspace.Api.Features.UserManagement.UpdateUser;

public sealed record Command(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string Username,
    string? ModifiedBy) : IRequest<Response?>;
