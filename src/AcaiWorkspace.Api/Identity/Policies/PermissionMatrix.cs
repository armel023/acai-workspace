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
                Permissions.BusinessEntityManagement.BusinessEntitiesRead,
                Permissions.BusinessEntityManagement.BusinessEntitiesCreate,
                Permissions.BusinessEntityManagement.BusinessEntitiesUpdate,
                Permissions.BusinessEntityManagement.BusinessEntitiesDelete,
                Permissions.SubEntityManagement.SubEntitiesRead,
                Permissions.SubEntityManagement.SubEntitiesCreate,
                Permissions.SubEntityManagement.SubEntitiesUpdate,
                Permissions.SubEntityManagement.SubEntitiesDelete,
                Permissions.UserManagement.UsersRead,
                Permissions.UserManagement.UsersCreate,
                Permissions.UserManagement.UsersUpdate,
                Permissions.UserManagement.UsersDelete,
                Permissions.UserAssignmentManagement.AssignmentsCreate,
                Permissions.UserAssignmentManagement.AssignmentsRead,
                Permissions.UserAssignmentManagement.AssignmentsUpdate,
                Permissions.UserAssignmentManagement.AssignmentsDelete,
                Permissions.UserAssignmentManagement.AssignmentsReset,
                Permissions.RoleManagement.RolesRead
            ],
            [AcaiRoles.SubEntityAdmin] =
            [
                Permissions.BusinessEntityManagement.BusinessEntitiesRead,
                Permissions.SubEntityManagement.SubEntitiesRead,
                Permissions.SubEntityManagement.SubEntitiesCreate,
                Permissions.SubEntityManagement.SubEntitiesUpdate,
                Permissions.UserManagement.UsersRead,
                Permissions.UserManagement.UsersUpdate,
                Permissions.UserAssignmentManagement.AssignmentsRead,
                Permissions.UserAssignmentManagement.AssignmentsUpdate,
                Permissions.RoleManagement.RolesRead
            ],
            [AcaiRoles.Assistant] =
            [
                Permissions.BusinessEntityManagement.BusinessEntitiesRead,
                Permissions.SubEntityManagement.SubEntitiesRead,
                Permissions.UserManagement.UserRead,
                Permissions.UserManagement.UserUpdate,
                Permissions.UserAssignmentManagement.AssignmentsRead,
                Permissions.RoleManagement.RolesRead
            ]
        };
}
