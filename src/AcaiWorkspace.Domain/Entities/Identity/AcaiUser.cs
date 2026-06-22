using Microsoft.AspNetCore.Identity;
using AcaiWorkspace.Domain.Abstractions;
using AcaiWorkspace.Domain.Entities.Organization;

namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiUser : IdentityUser<Guid>, IAuditEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public ICollection<UserAssignment> Assignments { get; set; } = new List<UserAssignment>();

    public DateTimeOffset? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTimeOffset? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }

    public void UpdateNames()
    {
        FullName = $"{FirstName} {LastName}".Trim();
        DisplayName = FullName;
    }
}
