using AcaiWorkspace.Api.Features.UserAssignmentManagement;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.ResetUserAssignments;

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
        _permissionService.RequirePermission(Permissions.UserAssignmentManagement.AssignmentsReset);

        var userExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Id == request.UserId, cancellationToken);

        if (!userExists)
        {
            return new Response(false, 0);
        }

        var assignments = await _dbContext.UserAssignments
            .Where(x => x.UserId == request.UserId && x.DeletedAt == null)
            .ToListAsync(cancellationToken);

        var removedCount = 0;
        foreach (var assignment in assignments)
        {
            if (assignment.DeletedAt is not null)
            {
                continue;
            }

            assignment.IsActive = false;
            assignment.DeletedAt = DateTimeOffset.UtcNow;
            assignment.DeletedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
                ? _currentUser.UserName
                : request.ModifiedBy?.Trim() ?? "system";
            removedCount++;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        await UserAssignmentAuthorizationSync.SyncUserAuthorizationAsync(_dbContext, request.UserId, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(true, removedCount);
    }
}
