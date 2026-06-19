namespace AcaiWorkspace.Domain.Abstractions;

public interface IAuditEntity
{
    DateTimeOffset? CreatedAt { get; set; }
    string? CreatedBy { get; set; }
    DateTimeOffset? ModifiedAt { get; set; }
    string? ModifiedBy { get; set; }
    DateTimeOffset? DeletedAt { get; set; }
    string? DeletedBy { get; set; }
}