using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.GetSubEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/sub-entities/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Query(id), ct);
                return result is null ? Results.NotFound() : Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("GetSubEntity")
            .WithTags("Sub Entity Management")
            .WithSummary("Get a sub-entity by id")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
    }
}
