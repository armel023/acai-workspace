using Microsoft.AspNetCore.Identity;

namespace AcaiWorkspace.Domain.Entities.Identity;

public sealed class AcaiUser : IdentityUser<Guid>
{
    public string DisplayName { get; set; } = string.Empty;
    public Guid? BusinessEntityId { get; set; }
    public Guid? SubEntityId { get; set; }
}
