namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.UpdateUserAssignment;

public sealed record Response(
    Guid Id,
    Guid UserId,
    string UserDisplayName,
    string UserEmail,
    string UserName,
    Guid? BusinessEntityId,
    string? BusinessEntityName,
    Guid? SubEntityId,
    string? SubEntityName,
    Guid RoleId,
    string Role,
    bool IsActive,
    DateTimeOffset? ModifiedAt,
    string? ModifiedBy);
