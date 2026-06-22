using AcaiWorkspace.Domain.Abstractions;
using AcaiWorkspace.Domain.Entities.Identity;

namespace AcaiWorkspace.Domain.Entities.Organization;

public sealed class UserAssignment : IAuditEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid? BusinessEntityId { get; set; }
    public Guid? SubEntityId { get; set; }
    public Guid RoleId { get; set; }
    public Guid? AssignedByUserId { get; set; }
    public DateTimeOffset AssignedAtUtc { get; set; }
    public bool IsActive { get; set; }

    public AcaiUser User { get; set; } = null!;
    public BusinessEntity? BusinessEntity { get; set; }
    public SubEntity? SubEntity { get; set; }
    public AcaiRole Role { get; set; } = null!;

    public DateTimeOffset? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTimeOffset? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }
}
