using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.UpdateBusinessEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/business-entities/{id:guid}", async (Guid id, Command request, ISender sender, CancellationToken ct) =>
            {
                var command = request with { Id = id };
                var result = await sender.Send(command, ct);
                return result is null ? Results.NotFound() : Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("UpdateBusinessEntity")
            .WithTags("Business Entity Management")
            .WithSummary("Update a business entity")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();
    }
}
