using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.SearchBusinessEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/business-entities", async (
                string? search,
                DateTimeOffset? createdAtFrom,
                DateTimeOffset? createdAtTo,
                string? sortBy,
                string? direction,
                int page,
                int pageSize,
                ISender sender,
                CancellationToken ct) =>
            {
                var result = await sender.Send(
                    new Query(search, createdAtFrom, createdAtTo, sortBy, direction, page == 0 ? 1 : page, pageSize == 0 ? 20 : pageSize),
                    ct);

                return Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("SearchBusinessEntity")
            .WithTags("Business Entity Management")
            .WithSummary("Search business entities with filtering, sorting, and pagination")
            .Produces<Response>(StatusCodes.Status200OK)
            .ProducesValidationProblem();
    }
}
