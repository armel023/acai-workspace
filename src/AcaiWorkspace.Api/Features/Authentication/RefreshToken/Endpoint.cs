using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.RefreshToken;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/refresh", async (Command? command, HttpRequest request, HttpResponse response, ISender sender, CancellationToken ct) =>
            {
                var incomingToken = command?.RefreshToken;
                if (string.IsNullOrWhiteSpace(incomingToken))
                {
                    incomingToken = request.Cookies["acai_refresh_token"];
                }

                if (string.IsNullOrWhiteSpace(incomingToken))
                {
                    return Results.Unauthorized();
                }

                var result = await sender.Send(new Command(incomingToken), ct);

                response.Cookies.Append("acai_refresh_token", result.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = result.RefreshTokenExpiresAtUtc
                });

                return Results.Ok(result with { RefreshToken = string.Empty });
            })
            .WithTags("Authentication")
            .WithName("RefreshToken")
            .WithSummary("Refresh access token")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .ProducesValidationProblem();
    }
}
