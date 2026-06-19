using AcaiWorkspace.Domain.Abstractions;
using AcaiWorkspace.Domain.Entities.Identity;
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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AcaiUser>(entity =>
        {
            entity.ToTable("acai_users");
            entity.Property(x => x.FirstName).HasMaxLength(100).IsRequired();
            entity.Property(x => x.LastName).HasMaxLength(100).IsRequired();
            entity.Property(x => x.FullName).HasMaxLength(201).IsRequired();
            entity.Property(x => x.DisplayName).HasMaxLength(200);
            entity.Property(x => x.BusinessEntityId);
            entity.Property(x => x.SubEntityId);
            entity.HasQueryFilter(x => x.DeletedAt == null);
        });

        builder.Entity<AcaiRole>(entity =>
        {
            entity.ToTable("acai_roles");
            entity.HasQueryFilter(x => x.DeletedAt == null);
        });

        builder.Entity<IdentityUserRole<Guid>>().ToTable("acai_user_roles");
        builder.Entity<IdentityUserClaim<Guid>>().ToTable("acai_user_claims");
        builder.Entity<IdentityUserLogin<Guid>>().ToTable("acai_user_logins");
        builder.Entity<IdentityRoleClaim<Guid>>().ToTable("acai_role_claims");
        builder.Entity<IdentityUserToken<Guid>>().ToTable("acai_user_tokens");

        builder.Entity<AcaiRefreshToken>(entity =>
        {
            entity.ToTable("acai_refresh_tokens");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.TokenHash).HasMaxLength(128).IsRequired();
            entity.HasIndex(x => x.TokenHash).IsUnique();
            entity.HasQueryFilter(x => x.DeletedAt == null && x.User.DeletedAt == null);
            entity.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
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
