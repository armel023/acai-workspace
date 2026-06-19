using Carter;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace AcaiWorkspace.Api.Features.UserManagement.SearchUser;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/users", async (
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
            .WithName("SearchUser")
            .WithTags("User Management")
            .WithSummary("Search users by full name, email, username, with filtering, sorting, and pagination")
            .Produces<Response>(StatusCodes.Status200OK)
            .ProducesValidationProblem();
    }
}
