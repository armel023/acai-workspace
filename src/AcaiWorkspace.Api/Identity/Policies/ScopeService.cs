namespace AcaiWorkspace.Api.Identity.Policies;

public sealed class ScopeService : IScopeService
{
    private readonly ICurrentUser _currentUser;

    public ScopeService(ICurrentUser currentUser)
    {
        _currentUser = currentUser;
    }

    public bool IsSameBusinessEntity(Guid businessEntityId)
    {
        if (_currentUser.Roles.Contains(AcaiRoles.SysAdmin, StringComparer.OrdinalIgnoreCase)
            || _currentUser.Roles.Contains(AcaiRoles.Admin, StringComparer.OrdinalIgnoreCase))
        {
            return true;
        }

         return _currentUser.ActiveBusinessEntityId.HasValue
             && _currentUser.ActiveBusinessEntityId.Value == businessEntityId;
    }

    public bool IsSameSubEntity(Guid subEntityId)
    {
        if (_currentUser.Roles.Contains(AcaiRoles.SysAdmin, StringComparer.OrdinalIgnoreCase)
            || _currentUser.Roles.Contains(AcaiRoles.Admin, StringComparer.OrdinalIgnoreCase))
        {
            return true;
        }

         return _currentUser.ActiveSubEntityId.HasValue
             && _currentUser.ActiveSubEntityId.Value == subEntityId;
    }

    public bool IsOwner(Guid ownerId)
    {
        return _currentUser.UserId.HasValue && _currentUser.UserId.Value == ownerId;
    }
}
