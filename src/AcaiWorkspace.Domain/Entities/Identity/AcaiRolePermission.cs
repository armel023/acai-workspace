namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiRolePermission
{
    public Guid RoleId { get; set; }
    public Guid PermissionId { get; set; }

    public AcaiRole Role { get; set; } = null!;
    public AcaiPermission Permission { get; set; } = null!;
}
