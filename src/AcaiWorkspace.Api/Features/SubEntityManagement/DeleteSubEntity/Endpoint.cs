using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.DeleteSubEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/sub-entities/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Command(id), ct);
                return result.Success ? Results.NoContent() : Results.NotFound();
            })
            .RequireAuthorization()
            .WithName("DeleteSubEntity")
            .WithTags("Sub Entity Management")
            .WithSummary("Delete a sub-entity")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
    }
}
