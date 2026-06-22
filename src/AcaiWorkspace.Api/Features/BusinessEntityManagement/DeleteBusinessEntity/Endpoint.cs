using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.DeleteBusinessEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/business-entities/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Command(id), ct);
                return result.Success ? Results.NoContent() : Results.NotFound();
            })
            .RequireAuthorization()
            .WithName("DeleteBusinessEntity")
            .WithTags("Business Entity Management")
            .WithSummary("Delete a business entity")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
    }
}
