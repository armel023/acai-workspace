using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace AcaiWorkspace.Api.Features.UserManagement.DeleteUser;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/users/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var result = await sender.Send(new Command(id), ct);
                return result.Success ? Results.NoContent() : Results.NotFound();
            })
            .RequireAuthorization()
            .WithName("DeleteUser")
            .WithTags("User Management")
            .WithSummary("Delete a user")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
    }
}
