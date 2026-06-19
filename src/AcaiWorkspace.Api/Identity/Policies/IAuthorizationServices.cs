using AcaiWorkspace.Domain.Entities.Identity;

namespace AcaiWorkspace.Api.Identity.Policies;

public interface IPermissionService
{
    bool HasPermission(string permission);
    void RequirePermission(string permission);
}

public interface IScopeService
{
    bool IsSameBusinessEntity(Guid businessEntityId);
    bool IsSameSubEntity(Guid subEntityId);
    bool IsOwner(Guid ownerId);
}

public interface IAuthorizationService
{
    void EnsureCanCreateUser();
    void EnsureCanReadUser(AcaiUser user);
    void EnsureCanUpdateUser(AcaiUser user);
    void EnsureCanDeleteUser(AcaiUser user);
}
