using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.CreateBusinessEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/business-entities", async (Command command, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);
                return Results.Created($"/api/business-entities/{result.Id}", result);
            })
            .RequireAuthorization()
            .WithName("CreateBusinessEntity")
            .WithTags("Business Entity Management")
            .WithSummary("Create a new business entity")
            .Produces<Response>(StatusCodes.Status201Created)
            .ProducesValidationProblem();
    }
}
