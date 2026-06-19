using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace AcaiWorkspace.Api.Features.UserManagement.CreateUser;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/users", async (Command command, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);
                return Results.Created($"/api/users/{result.Id}", result);
            })
            .RequireAuthorization()
            .WithName("CreateUser")
            .WithTags("User Management")
            .WithSummary("Create a new user")
            .Produces<Response>(StatusCodes.Status201Created)
            .ProducesValidationProblem();
    }
}
