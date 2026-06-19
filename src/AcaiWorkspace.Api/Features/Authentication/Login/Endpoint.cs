using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.Login;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async (Command command, ISender sender, HttpResponse response, CancellationToken ct) =>
            {
                var result = await sender.Send(command, ct);

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
            .WithName("Login")
            .WithSummary("Authenticate user and issue access and refresh tokens")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .ProducesValidationProblem();
    }
}
