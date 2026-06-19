using AcaiWorkspace.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AcaiWorkspace.Infrastructure.Persistence;

public sealed class AcaiIdentityDbContext : IdentityDbContext<AcaiUser, AcaiRole, Guid>
{
    public AcaiIdentityDbContext(DbContextOptions<AcaiIdentityDbContext> options)
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
            entity.Property(x => x.DisplayName).HasMaxLength(200);
            entity.Property(x => x.BusinessEntityId);
            entity.Property(x => x.SubEntityId);
        });

        builder.Entity<AcaiRole>().ToTable("acai_roles");
        builder.Entity<IdentityUserRole<Guid>>().ToTable("acai_user_roles");
        builder.Entity<IdentityUserClaim<Guid>>().ToTable("acai_user_claims");
        builder.Entity<IdentityUserLogin<Guid>>().ToTable("acai_user_logins");
        builder.Entity<IdentityRoleClaim<Guid>>().ToTable("acai_role_claims");
        builder.Entity<IdentityUserToken<Guid>>().ToTable("acai_user_tokens");

        builder.Entity<AcaiRefreshToken>(entity =>
        {
            entity.ToTable("acai_refresh_tokens");
            entity.HasKey(x => x.Id);

            entity.Property(x => x.TokenHash)
                .HasMaxLength(128)
                .IsRequired();

            entity.HasIndex(x => x.TokenHash)
                .IsUnique();

            entity.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
