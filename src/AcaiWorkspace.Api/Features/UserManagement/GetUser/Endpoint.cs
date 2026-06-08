using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.UserManagement.GetUser;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/users/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Query(id), ct);
                return result is null ? Results.NotFound() : Results.Ok(result);
            })
            .WithName("GetUser")
            .WithTags("User Management")
            .WithSummary("Get a user by id")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
    }
}
