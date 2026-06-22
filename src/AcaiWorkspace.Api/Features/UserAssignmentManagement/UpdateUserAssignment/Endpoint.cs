using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.UpdateUserAssignment;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/user-assignments/{id:guid}", async (Guid id, Command request, ISender sender, CancellationToken ct) =>
            {
                var command = request with { Id = id };
                var result = await sender.Send(command, ct);
                return result is null ? Results.NotFound() : Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("UpdateUserAssignment")
            .WithTags("User Assignment Management")
            .WithSummary("Update an existing user assignment")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();
    }
}
