using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.CreateSubEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/sub-entities", async (Command command, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);
                return Results.Created($"/api/sub-entities/{result.Id}", result);
            })
            .RequireAuthorization()
            .WithName("CreateSubEntity")
            .WithTags("Sub Entity Management")
            .WithSummary("Create a new sub-entity")
            .Produces<Response>(StatusCodes.Status201Created)
            .ProducesValidationProblem();
    }
}
