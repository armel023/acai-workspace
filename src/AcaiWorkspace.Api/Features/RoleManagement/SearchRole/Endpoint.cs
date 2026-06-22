using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.RoleManagement.SearchRole;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/roles", async (ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Query(), ct);
                return Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("SearchRole")
            .WithTags("Role Management")
            .WithSummary("List available roles")
            .Produces<IReadOnlyCollection<ResponseItem>>(StatusCodes.Status200OK);
    }
}
