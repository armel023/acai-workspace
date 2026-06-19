namespace AcaiWorkspace.Api.Identity.Policies;

public sealed class PermissionService : IPermissionService
{
    private readonly ICurrentUser _currentUser;

    public PermissionService(ICurrentUser currentUser)
    {
        _currentUser = currentUser;
    }

    public bool HasPermission(string permission)
    {
        return _currentUser.Permissions.Contains(permission, StringComparer.OrdinalIgnoreCase)
               || _currentUser.Roles.Contains(AcaiRoles.SysAdmin, StringComparer.OrdinalIgnoreCase);
    }

    public void RequirePermission(string permission)
    {
        if (!HasPermission(permission))
        {
            throw new UnauthorizedAccessException($"Missing required permission: {permission}");
        }
    }
}
