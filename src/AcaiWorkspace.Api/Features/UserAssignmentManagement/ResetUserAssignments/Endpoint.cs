using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.ResetUserAssignments;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/users/{userId:guid}/assignments", async (Guid userId, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Command(userId), ct);
                return result.Success ? Results.Ok(result) : Results.NotFound();
            })
            .RequireAuthorization()
            .WithName("ResetUserAssignments")
            .WithTags("User Assignment Management")
            .WithSummary("Reset all assignments for a specific user")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();
    }
}
