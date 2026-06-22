namespace AcaiWorkspace.Api.Identity.Policies;

public static class Permissions
{
    public static class BusinessEntityManagement
    {
        public const string BusinessEntitiesCreate = "BusinessEntityManagement.BusinessEntities.Create";
        public const string BusinessEntitiesRead = "BusinessEntityManagement.BusinessEntities.Read";
        public const string BusinessEntitiesUpdate = "BusinessEntityManagement.BusinessEntities.Update";
        public const string BusinessEntitiesDelete = "BusinessEntityManagement.BusinessEntities.Delete";
    }

    public static class SubEntityManagement
    {
        public const string SubEntitiesCreate = "SubEntityManagement.SubEntities.Create";
        public const string SubEntitiesRead = "SubEntityManagement.SubEntities.Read";
        public const string SubEntitiesUpdate = "SubEntityManagement.SubEntities.Update";
        public const string SubEntitiesDelete = "SubEntityManagement.SubEntities.Delete";
    }

    public static class UserManagement
    {
        public const string UsersCreate = "UserManagement.Users.Create";
        public const string UsersRead = "UserManagement.Users.Read";
        public const string UsersUpdate = "UserManagement.Users.Update";
        public const string UsersDelete = "UserManagement.Users.Delete";

        public const string UserRead = "UserManagement.User.Read";
        public const string UserUpdate = "UserManagement.User.Update";
        public const string UserDelete = "UserManagement.User.Delete";
    }

    public static class UserAssignmentManagement
    {
        public const string AssignmentsCreate = "UserAssignmentManagement.Assignments.Create";
        public const string AssignmentsRead = "UserAssignmentManagement.Assignments.Read";
        public const string AssignmentsUpdate = "UserAssignmentManagement.Assignments.Update";
        public const string AssignmentsDelete = "UserAssignmentManagement.Assignments.Delete";
        public const string AssignmentsReset = "UserAssignmentManagement.Assignments.Reset";
    }

    public static class RoleManagement
    {
        public const string RolesRead = "RoleManagement.Roles.Read";
    }

    public static readonly IReadOnlyCollection<string> All =
    [
        BusinessEntityManagement.BusinessEntitiesCreate,
        BusinessEntityManagement.BusinessEntitiesRead,
        BusinessEntityManagement.BusinessEntitiesUpdate,
        BusinessEntityManagement.BusinessEntitiesDelete,
        SubEntityManagement.SubEntitiesCreate,
        SubEntityManagement.SubEntitiesRead,
        SubEntityManagement.SubEntitiesUpdate,
        SubEntityManagement.SubEntitiesDelete,
        UserManagement.UsersCreate,
        UserManagement.UsersRead,
        UserManagement.UsersUpdate,
        UserManagement.UsersDelete,
        UserManagement.UserRead,
        UserManagement.UserUpdate,
        UserManagement.UserDelete,
        UserAssignmentManagement.AssignmentsCreate,
        UserAssignmentManagement.AssignmentsRead,
        UserAssignmentManagement.AssignmentsUpdate,
        UserAssignmentManagement.AssignmentsDelete,
        UserAssignmentManagement.AssignmentsReset,
        RoleManagement.RolesRead
    ];
}
