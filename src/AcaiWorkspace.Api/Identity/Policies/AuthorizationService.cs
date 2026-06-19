using AcaiWorkspace.Domain.Entities;

namespace AcaiWorkspace.Api.Identity.Policies;

public sealed class AuthorizationService : IAuthorizationService
{
    private readonly IPermissionService _permissionService;
    private readonly IScopeService _scopeService;

    public AuthorizationService(IPermissionService permissionService, IScopeService scopeService)
    {
        _permissionService = permissionService;
        _scopeService = scopeService;
    }

    public void EnsureCanCreateUser()
    {
        _permissionService.RequirePermission(Permissions.UserManagement.UsersCreate);
    }

    public void EnsureCanReadUser(User user)
    {
        if (_permissionService.HasPermission(Permissions.UserManagement.UsersRead))
        {
            return;
        }

        _permissionService.RequirePermission(Permissions.UserManagement.UserRead);

        if (!_scopeService.IsOwner(user.Id))
        {
            throw new UnauthorizedAccessException("Forbidden: can only read own user.");
        }
    }

    public void EnsureCanUpdateUser(User user)
    {
        if (_permissionService.HasPermission(Permissions.UserManagement.UsersUpdate))
        {
            return;
        }

        _permissionService.RequirePermission(Permissions.UserManagement.UserUpdate);

        if (!_scopeService.IsOwner(user.Id))
        {
            throw new UnauthorizedAccessException("Forbidden: can only update own user.");
        }
    }

    public void EnsureCanDeleteUser(User user)
    {
        if (_permissionService.HasPermission(Permissions.UserManagement.UsersDelete))
        {
            return;
        }

        _permissionService.RequirePermission(Permissions.UserManagement.UserDelete);

        if (!_scopeService.IsOwner(user.Id))
        {
            throw new UnauthorizedAccessException("Forbidden: can only delete own user.");
        }
    }
}
