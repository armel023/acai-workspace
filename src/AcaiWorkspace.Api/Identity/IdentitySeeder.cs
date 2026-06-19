using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Domain.Entities.Identity;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Identity;

public sealed class IdentitySeeder
{
    private readonly AcaiIdentityDbContext _dbContext;
    private readonly RoleManager<AcaiRole> _roleManager;
    private readonly UserManager<AcaiUser> _userManager;

    public IdentitySeeder(
        AcaiIdentityDbContext dbContext,
        RoleManager<AcaiRole> roleManager,
        UserManager<AcaiUser> userManager)
    {
        _dbContext = dbContext;
        _roleManager = roleManager;
        _userManager = userManager;
    }

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.Database.MigrateAsync(cancellationToken);

        foreach (var role in AcaiRoles.All)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new AcaiRole { Name = role });
            }
        }

        foreach (var rolePermissions in PermissionMatrix.RolePermissions)
        {
            var role = await _roleManager.FindByNameAsync(rolePermissions.Key);
            if (role is null)
            {
                continue;
            }

            var existingClaims = await _roleManager.GetClaimsAsync(role);
            var existingValues = existingClaims
                .Where(x => x.Type == AcaiClaimTypes.Permission)
                .Select(x => x.Value)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            foreach (var permission in rolePermissions.Value)
            {
                if (!existingValues.Contains(permission))
                {
                    await _roleManager.AddClaimAsync(role, new Claim(AcaiClaimTypes.Permission, permission));
                }
            }
        }

        const string seedEmail = "sysadmin@acaiworkspace.local";
        const string seedUsername = "sysadmin";
        const string seedPassword = "Acai#SysAdmin123";

        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == seedEmail, cancellationToken);
        if (user is null)
        {
            user = new AcaiUser
            {
                Id = Guid.NewGuid(),
                UserName = seedUsername,
                NormalizedUserName = seedUsername.ToUpperInvariant(),
                Email = seedEmail,
                NormalizedEmail = seedEmail.ToUpperInvariant(),
                EmailConfirmed = true,
                DisplayName = "System Administrator"
            };

            var result = await _userManager.CreateAsync(user, seedPassword);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(x => $"{x.Code}:{x.Description}"));
                throw new InvalidOperationException($"Failed to seed SysAdmin user. {errors}");
            }
        }

        if (!await _userManager.IsInRoleAsync(user, AcaiRoles.SysAdmin))
        {
            await _userManager.AddToRoleAsync(user, AcaiRoles.SysAdmin);
        }
    }
}
