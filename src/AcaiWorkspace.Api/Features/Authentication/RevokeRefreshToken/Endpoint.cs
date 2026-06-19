using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.Authentication.RevokeRefreshToken;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/revoke", async (Command? command, HttpRequest request, HttpResponse response, ISender sender, CancellationToken ct) =>
            {
                var incomingToken = command?.RefreshToken;
                if (string.IsNullOrWhiteSpace(incomingToken))
                {
                    incomingToken = request.Cookies["acai_refresh_token"];
                }

                if (string.IsNullOrWhiteSpace(incomingToken))
                {
                    return Results.Ok(new Response(true));
                }

                var result = await sender.Send(new Command(incomingToken), ct);

                response.Cookies.Delete("acai_refresh_token", new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict
                });

                return Results.Ok(result);
            })
            .WithTags("Authentication")
            .WithName("RevokeRefreshToken")
            .WithSummary("Revoke refresh token")
            .Produces<Response>(StatusCodes.Status200OK)
            .ProducesValidationProblem();
    }
}
