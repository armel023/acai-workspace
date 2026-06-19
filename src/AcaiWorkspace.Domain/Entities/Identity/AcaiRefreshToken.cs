using AcaiWorkspace.Domain.Abstractions;

namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiRefreshToken : IAuditEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string TokenHash { get; set; } = string.Empty;
    public DateTime ExpiresAtUtc { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? RevokedAtUtc { get; set; }
    public string? ReplacedByTokenHash { get; set; }

    public DateTimeOffset? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTimeOffset? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }

    public AcaiUser User { get; set; } = null!;
}
