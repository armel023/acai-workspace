using System.Security.Claims;

namespace AcaiWorkspace.Api.Identity.Policies;

public sealed class CurrentUser : ICurrentUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private ClaimsPrincipal? Principal => _httpContextAccessor.HttpContext?.User;

    public bool IsAuthenticated => Principal?.Identity?.IsAuthenticated ?? false;

    public Guid? UserId
    {
        get
        {
            var raw = Principal?.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.TryParse(raw, out var value) ? value : null;
        }
    }

    public string UserName => Principal?.Identity?.Name ?? string.Empty;

    public string Email => Principal?.FindFirstValue(ClaimTypes.Email) ?? string.Empty;

    public Guid? ActiveBusinessEntityId
    {
        get
        {
            var raw = Principal?.FindFirstValue(AcaiClaimTypes.ActiveBusinessEntityId);
            return Guid.TryParse(raw, out var value) ? value : null;
        }
    }

    public Guid? ActiveSubEntityId
    {
        get
        {
            var raw = Principal?.FindFirstValue(AcaiClaimTypes.ActiveSubEntityId);
            return Guid.TryParse(raw, out var value) ? value : null;
        }
    }

    public IReadOnlyCollection<string> Roles =>
        Principal?
            .FindAll(ClaimTypes.Role)
            .Select(x => x.Value)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray() ?? [];

    public IReadOnlyCollection<string> Permissions =>
        Principal?
            .FindAll(AcaiClaimTypes.Permission)
            .Select(x => x.Value)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray() ?? [];
}
