using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.SearchSubEntity;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/sub-entities", async (
                string? search,
                Guid? businessEntityId,
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
                    new Query(
                        search,
                        businessEntityId,
                        createdAtFrom,
                        createdAtTo,
                        sortBy,
                        direction,
                        page == 0 ? 1 : page,
                        pageSize == 0 ? 20 : pageSize),
                    ct);

                return Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("SearchSubEntity")
            .WithTags("Sub Entity Management")
            .WithSummary("Search sub-entities with filtering, sorting, and pagination")
            .Produces<Response>(StatusCodes.Status200OK)
            .ProducesValidationProblem();
    }
}
