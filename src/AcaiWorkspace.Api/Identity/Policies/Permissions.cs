namespace AcaiWorkspace.Api.Identity.Policies;

public static class Permissions
{
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

    public static readonly IReadOnlyCollection<string> All =
    [
        UserManagement.UsersCreate,
        UserManagement.UsersRead,
        UserManagement.UsersUpdate,
        UserManagement.UsersDelete,
        UserManagement.UserRead,
        UserManagement.UserUpdate,
        UserManagement.UserDelete
    ];
}
