using Carter;
using MediatR;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.SearchUserAssignment;

public sealed class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/user-assignments", async (
                string? search,
                Guid? userId,
                Guid? roleId,
                Guid? businessEntityId,
                Guid? subEntityId,
                bool? isActive,
                DateTimeOffset? createdAtFrom,
                DateTimeOffset? createdAtTo,
                DateTimeOffset? modifiedAtFrom,
                DateTimeOffset? modifiedAtTo,
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
                        userId,
                        roleId,
                        businessEntityId,
                        subEntityId,
                        isActive,
                        createdAtFrom,
                        createdAtTo,
                        modifiedAtFrom,
                        modifiedAtTo,
                        sortBy,
                        direction,
                        page == 0 ? 1 : page,
                        pageSize == 0 ? 20 : pageSize),
                    ct);

                return Results.Ok(result);
            })
            .RequireAuthorization()
            .WithName("SearchUserAssignment")
            .WithTags("User Assignment Management")
            .WithSummary("Search user assignments with filters and pagination")
            .Produces<Response>(StatusCodes.Status200OK)
            .ProducesValidationProblem();
    }
}
