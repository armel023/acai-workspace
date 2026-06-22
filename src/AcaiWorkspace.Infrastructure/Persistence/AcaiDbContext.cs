using AcaiWorkspace.Domain.Abstractions;
using AcaiWorkspace.Domain.Entities.Identity;
using AcaiWorkspace.Domain.Entities.Organization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Infrastructure.Persistence;

public sealed class AcaiDbContext : IdentityDbContext<AcaiUser, AcaiRole, Guid>
{
    public AcaiDbContext(DbContextOptions<AcaiDbContext> options)
        : base(options)
    {
    }

    public DbSet<AcaiRefreshToken> RefreshTokens => Set<AcaiRefreshToken>();
    public DbSet<BusinessEntity> BusinessEntities => Set<BusinessEntity>();
    public DbSet<SubEntity> SubEntities => Set<SubEntity>();
    public DbSet<AcaiPermission> Permissions => Set<AcaiPermission>();
    public DbSet<AcaiRolePermission> RolePermissions => Set<AcaiRolePermission>();
    public DbSet<UserAssignment> UserAssignments => Set<UserAssignment>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityUserRole<Guid>>().ToTable("acai_user_roles");
        builder.Entity<IdentityUserClaim<Guid>>().ToTable("acai_user_claims");
        builder.Entity<IdentityUserLogin<Guid>>().ToTable("acai_user_logins");
        builder.Entity<IdentityRoleClaim<Guid>>().ToTable("acai_role_claims");
        builder.Entity<IdentityUserToken<Guid>>().ToTable("acai_user_tokens");

        builder.ApplyConfigurationsFromAssembly(typeof(AcaiDbContext).Assembly);
    }

    public override int SaveChanges()
    {
        ApplyAudit();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAudit();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyAudit()
    {
        var now = DateTimeOffset.UtcNow;

        foreach (var entry in ChangeTracker.Entries<IAuditEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt ??= now;
                entry.Entity.CreatedBy ??= "system";
            }

            if (entry.State == EntityState.Modified)
            {
                entry.Entity.ModifiedAt = now;
            }

            if (entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                entry.Entity.DeletedAt = now;
                entry.Entity.DeletedBy ??= "system";
            }
        }
    }
}
