using AcaiWorkspace.Domain.Abstractions;

namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiPermission : IAuditEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<AcaiRolePermission> RolePermissions { get; set; } = new List<AcaiRolePermission>();

    public DateTimeOffset? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTimeOffset? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }
}
