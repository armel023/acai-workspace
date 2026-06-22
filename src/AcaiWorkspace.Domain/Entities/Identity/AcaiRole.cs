using Microsoft.AspNetCore.Identity;
using AcaiWorkspace.Domain.Abstractions;
using AcaiWorkspace.Domain.Entities.Organization;

namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiRole : IdentityRole<Guid>, IAuditEntity
{
	public ICollection<UserAssignment> Assignments { get; set; } = new List<UserAssignment>();
	public ICollection<AcaiRolePermission> RolePermissions { get; set; } = new List<AcaiRolePermission>();

	public DateTimeOffset? CreatedAt { get; set; }
	public string? CreatedBy { get; set; }
	public DateTimeOffset? ModifiedAt { get; set; }
	public string? ModifiedBy { get; set; }
	public DateTimeOffset? DeletedAt { get; set; }
	public string? DeletedBy { get; set; }
}
