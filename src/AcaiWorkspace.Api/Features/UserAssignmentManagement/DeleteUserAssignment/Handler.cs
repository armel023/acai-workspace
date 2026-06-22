using AcaiWorkspace.Api.Features.UserAssignmentManagement;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.DeleteUserAssignment;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IPermissionService _permissionService;
    private readonly ICurrentUser _currentUser;

    public Handler(
        AcaiDbContext dbContext,
        IPermissionService permissionService,
        ICurrentUser currentUser)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
        _currentUser = currentUser;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.UserAssignmentManagement.AssignmentsDelete);

        var entity = await _dbContext.UserAssignments
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return new Response(false);
        }

        entity.IsActive = false;
        entity.DeletedAt = DateTimeOffset.UtcNow;
        entity.DeletedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
            ? _currentUser.UserName
            : "system";

        var userId = entity.UserId;

        await _dbContext.SaveChangesAsync(cancellationToken);

        await UserAssignmentAuthorizationSync.SyncUserAuthorizationAsync(_dbContext, userId, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true);
    }
}
