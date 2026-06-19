namespace AcaiWorkspace.Api.Identity.Policies;

public static class PermissionMatrix
{
    public static readonly IReadOnlyDictionary<string, IReadOnlyCollection<string>> RolePermissions =
        new Dictionary<string, IReadOnlyCollection<string>>(StringComparer.OrdinalIgnoreCase)
        {
            [AcaiRoles.SysAdmin] = Permissions.All,
            [AcaiRoles.Admin] = Permissions.All,
            [AcaiRoles.BusinessEntityAdmin] =
            [
                Permissions.UserManagement.UsersRead,
                Permissions.UserManagement.UsersCreate,
                Permissions.UserManagement.UsersUpdate,
                Permissions.UserManagement.UsersDelete
            ],
            [AcaiRoles.SubEntityAdmin] =
            [
                Permissions.UserManagement.UsersRead,
                Permissions.UserManagement.UsersUpdate
            ],
            [AcaiRoles.Assistant] =
            [
                Permissions.UserManagement.UserRead,
                Permissions.UserManagement.UserUpdate
            ]
        };
}
