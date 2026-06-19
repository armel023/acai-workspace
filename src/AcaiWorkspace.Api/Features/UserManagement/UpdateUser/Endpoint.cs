using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace AcaiWorkspace.Api.Features.UserManagement.UpdateUser;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/users/{id:guid}", async (Guid id, Command request, ISender sender, CancellationToken ct) =>
            {
                var command = request with { Id = id };
                var result = await sender.Send(command, ct);
                return result is null ? Results.NotFound() : Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("UpdateUser")
            .WithTags("User Management")
            .WithSummary("Update a user")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();
    }
}
