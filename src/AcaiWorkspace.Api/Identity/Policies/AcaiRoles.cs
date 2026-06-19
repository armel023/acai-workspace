namespace AcaiWorkspace.Api.Identity.Policies;

public static class AcaiRoles
{
    public const string SysAdmin = "SysAdmin";
    public const string Admin = "Admin";
    public const string BusinessEntityAdmin = "BusinessEntityAdmin";
    public const string SubEntityAdmin = "SubEntityAdmin";
    public const string Assistant = "Assistant";

    public static readonly IReadOnlyCollection<string> All =
    [
        SysAdmin,
        Admin,
        BusinessEntityAdmin,
        SubEntityAdmin,
        Assistant
    ];
}
