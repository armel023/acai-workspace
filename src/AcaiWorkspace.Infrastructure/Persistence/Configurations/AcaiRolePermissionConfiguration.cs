using AcaiWorkspace.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AcaiWorkspace.Infrastructure.Persistence.Configurations;

public sealed class AcaiRolePermissionConfiguration : IEntityTypeConfiguration<AcaiRolePermission>
{
    public void Configure(EntityTypeBuilder<AcaiRolePermission> builder)
    {
        builder.ToTable("acai_role_permissions");

        builder.HasKey(x => new { x.RoleId, x.PermissionId });

        builder.HasOne(x => x.Role)
            .WithMany(x => x.RolePermissions)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Permission)
            .WithMany(x => x.RolePermissions)
            .HasForeignKey(x => x.PermissionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
