using AcaiWorkspace.Domain.Abstractions;

namespace AcaiWorkspace.Domain.Entities.Organization;

public sealed class BusinessEntity : IAuditEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }

    public ICollection<SubEntity> SubEntities { get; set; } = new List<SubEntity>();

    public DateTimeOffset? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTimeOffset? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }
}
