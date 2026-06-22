namespace AcaiWorkspace.Api.Identity.Policies;

public interface ICurrentUser
{
    bool IsAuthenticated { get; }
    Guid? UserId { get; }
    string UserName { get; }
    string Email { get; }
    Guid? ActiveBusinessEntityId { get; }
    Guid? ActiveSubEntityId { get; }
    IReadOnlyCollection<string> Roles { get; }
    IReadOnlyCollection<string> Permissions { get; }
}
