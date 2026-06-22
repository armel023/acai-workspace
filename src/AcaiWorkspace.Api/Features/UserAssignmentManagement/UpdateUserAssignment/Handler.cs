using AcaiWorkspace.Api.Features.UserAssignmentManagement;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Domain.Entities.Organization;
using AcaiWorkspace.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.UpdateUserAssignment;

public sealed class Handler : IRequestHandler<Command, Response?>
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

    public async Task<Response?> Handle(Command request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.UserAssignmentManagement.AssignmentsUpdate);

        var entity = await _dbContext.UserAssignments
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return null;
        }

        var oldUserId = entity.UserId;

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            throw new InvalidOperationException("User was not found.");
        }

        var role = await _dbContext.Roles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.RoleId, cancellationToken);

        if (role is null)
        {
            throw new InvalidOperationException("Role was not found.");
        }

        var isGlobalRole = string.Equals(role.Name, AcaiRoles.SysAdmin, StringComparison.OrdinalIgnoreCase)
            || string.Equals(role.Name, AcaiRoles.Admin, StringComparison.OrdinalIgnoreCase);

        Guid? businessEntityId = request.BusinessEntityId;
        Guid? subEntityId = request.SubEntityId;
        BusinessEntity? businessEntity = null;
        SubEntity? subEntity = null;

        if (isGlobalRole)
        {
            businessEntityId = null;
            subEntityId = null;
        }
        else
        {
            if (!businessEntityId.HasValue)
            {
                throw new InvalidOperationException("Business entity is required for non-global roles.");
            }

            businessEntity = await _dbContext.BusinessEntities
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == businessEntityId.Value, cancellationToken);

            if (businessEntity is null)
            {
                throw new InvalidOperationException("Business entity was not found.");
            }

            if (subEntityId.HasValue)
            {
                subEntity = await _dbContext.SubEntities
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == subEntityId.Value, cancellationToken);

                if (subEntity is null)
                {
                    throw new InvalidOperationException("Sub entity was not found.");
                }

                if (subEntity.BusinessEntityId != businessEntityId.Value)
                {
                    throw new InvalidOperationException("Sub entity does not belong to the selected business entity.");
                }
            }
        }

        var duplicateExists = await _dbContext.UserAssignments
            .AsNoTracking()
            .AnyAsync(
                x => x.Id != request.Id
                    && x.UserId == request.UserId
                    && x.BusinessEntityId == businessEntityId
                    && x.SubEntityId == subEntityId
                    && x.RoleId == request.RoleId
                    && x.IsActive
                    && x.DeletedAt == null,
                cancellationToken);

        if (duplicateExists)
        {
            throw new InvalidOperationException("An active assignment with the same role and scope already exists for this user.");
        }

        entity.UserId = request.UserId;
        entity.BusinessEntityId = businessEntityId;
        entity.SubEntityId = subEntityId;
        entity.RoleId = request.RoleId;
        entity.IsActive = request.IsActive;
        entity.ModifiedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
            ? _currentUser.UserName
            : request.ModifiedBy?.Trim() ?? "system";

        await _dbContext.SaveChangesAsync(cancellationToken);

        await UserAssignmentAuthorizationSync.SyncUserAuthorizationAsync(_dbContext, request.UserId, cancellationToken);
        if (oldUserId != request.UserId)
        {
            await UserAssignmentAuthorizationSync.SyncUserAuthorizationAsync(_dbContext, oldUserId, cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            entity.Id,
            entity.UserId,
            user.FullName,
            user.Email ?? string.Empty,
            user.UserName ?? string.Empty,
            entity.BusinessEntityId,
            businessEntity?.Name,
            entity.SubEntityId,
            subEntity?.Name,
            entity.RoleId,
            role.Name ?? string.Empty,
            entity.IsActive,
            entity.ModifiedAt,
            entity.ModifiedBy);
    }
}
