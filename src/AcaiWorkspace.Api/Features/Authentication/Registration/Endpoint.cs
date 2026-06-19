using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.Registration;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/register", async (Command command, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);
                return Results.Created($"/api/users/{result.UserId}", result);
            })
            .WithTags("Authentication")
            .WithName("Register")
            .WithSummary("Register a new user account")
            .Produces<Response>(StatusCodes.Status201Created)
            .ProducesValidationProblem();
    }
}
