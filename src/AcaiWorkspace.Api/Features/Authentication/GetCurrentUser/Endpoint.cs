using System.Security.Claims;
using Carter;
using Microsoft.AspNetCore.Authorization;

namespace AcaiWorkspace.Api.Features.Authentication.GetCurrentUser;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/auth/me", [Authorize] (ClaimsPrincipal user) =>
            {
                var result = new
                {
                    UserId = user.FindFirstValue(ClaimTypes.NameIdentifier),
                    UserName = user.Identity?.Name,
                    Email = user.FindFirstValue(ClaimTypes.Email),
                    Roles = user.FindAll(ClaimTypes.Role).Select(x => x.Value).ToArray(),
                    Permissions = user.FindAll("permission").Select(x => x.Value).ToArray()
                };

                return Results.Ok(result);
            })
            .WithTags("Authentication")
            .WithName("GetCurrentUser")
            .WithSummary("Get authenticated user profile and grants")
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized);
    }
}
