using AcaiWorkspace.Domain.Entities;

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
    void EnsureCanReadUser(User user);
    void EnsureCanUpdateUser(User user);
    void EnsureCanDeleteUser(User user);
}
