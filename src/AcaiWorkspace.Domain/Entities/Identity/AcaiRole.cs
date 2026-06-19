using Microsoft.AspNetCore.Identity;
using AcaiWorkspace.Domain.Abstractions;

namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiRole : IdentityRole<Guid>, IAuditEntity
{
	public DateTimeOffset? CreatedAt { get; set; }
	public string? CreatedBy { get; set; }
	public DateTimeOffset? ModifiedAt { get; set; }
	public string? ModifiedBy { get; set; }
	public DateTimeOffset? DeletedAt { get; set; }
	public string? DeletedBy { get; set; }
}
