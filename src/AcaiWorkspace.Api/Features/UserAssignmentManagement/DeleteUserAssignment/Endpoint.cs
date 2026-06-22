using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.DeleteUserAssignment;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/user-assignments/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Command(id), ct);
                return result.Success ? Results.NoContent() : Results.NotFound();
            })
            .RequireAuthorization()
            .WithName("DeleteUserAssignment")
            .WithTags("User Assignment Management")
            .WithSummary("Remove a user assignment")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
    }
}
