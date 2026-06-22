using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement;

internal static class UserAssignmentAuthorizationSync
{
    public static async Task SyncUserAuthorizationAsync(
        AcaiDbContext dbContext,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var userExists = await dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Id == userId, cancellationToken);

        if (!userExists)
        {
            return;
        }

        var activeRoleIds = await dbContext.UserAssignments
            .AsNoTracking()
            .Where(x => x.UserId == userId && x.IsActive && x.DeletedAt == null)
            .Select(x => x.RoleId)
            .Distinct()
            .ToListAsync(cancellationToken);

        var targetRoleMap = await dbContext.Roles
            .AsNoTracking()
            .Where(x => activeRoleIds.Contains(x.Id) && x.Name != null)
            .Select(x => new { x.Id, x.Name })
            .ToDictionaryAsync(x => x.Id, x => x.Name!, cancellationToken);

        var targetRoleIds = targetRoleMap.Keys.ToHashSet();

        var currentUserRoles = await dbContext.UserRoles
            .Where(x => x.UserId == userId)
            .ToListAsync(cancellationToken);

        var toRemoveRoles = currentUserRoles
            .Where(x => !targetRoleIds.Contains(x.RoleId))
            .ToList();

        if (toRemoveRoles.Count > 0)
        {
            dbContext.UserRoles.RemoveRange(toRemoveRoles);
        }

        var currentRoleIds = currentUserRoles
            .Select(x => x.RoleId)
            .ToHashSet();

        var toAddRoles = targetRoleIds
            .Where(roleId => !currentRoleIds.Contains(roleId))
            .Select(roleId => new IdentityUserRole<Guid>
            {
                UserId = userId,
                RoleId = roleId
            })
            .ToList();

        if (toAddRoles.Count > 0)
        {
            dbContext.UserRoles.AddRange(toAddRoles);
        }

        var targetPermissions = await dbContext.RoleClaims
            .AsNoTracking()
            .Where(x => targetRoleIds.Contains(x.RoleId) && x.ClaimType == AcaiClaimTypes.Permission)
            .Select(x => x.ClaimValue)
            .Where(x => x != null)
            .Distinct()
            .Cast<string>()
            .ToListAsync(cancellationToken);

        var currentPermissionClaims = await dbContext.UserClaims
            .Where(x => x.UserId == userId && x.ClaimType == AcaiClaimTypes.Permission)
            .ToListAsync(cancellationToken);

        if (currentPermissionClaims.Count > 0)
        {
            dbContext.UserClaims.RemoveRange(currentPermissionClaims);
        }

        if (targetPermissions.Count > 0)
        {
            dbContext.UserClaims.AddRange(targetPermissions.Select(permission => new IdentityUserClaim<Guid>
            {
                UserId = userId,
                ClaimType = AcaiClaimTypes.Permission,
                ClaimValue = permission
            }));
        }
    }
}
