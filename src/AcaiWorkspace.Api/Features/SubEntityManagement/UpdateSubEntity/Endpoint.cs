using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.UpdateSubEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/sub-entities/{id:guid}", async (Guid id, Command request, ISender sender, CancellationToken ct) =>
            {
                var command = request with { Id = id };
                var result = await sender.Send(command, ct);
                return result is null ? Results.NotFound() : Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("UpdateSubEntity")
            .WithTags("Sub Entity Management")
            .WithSummary("Update a sub-entity")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();
    }
}
