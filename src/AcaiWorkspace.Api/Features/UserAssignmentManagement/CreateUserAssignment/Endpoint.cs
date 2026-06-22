using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.CreateUserAssignment;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/user-assignments", async (Command command, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);
                return Results.Created($"/api/user-assignments/{result.Id}", result);
            })
            .RequireAuthorization()
            .WithName("CreateUserAssignment")
            .WithTags("User Assignment Management")
            .WithSummary("Assign a role and organization scope to a user")
            .Produces<Response>(StatusCodes.Status201Created)
            .ProducesValidationProblem();
    }
}
