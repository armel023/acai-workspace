using AcaiWorkspace.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AcaiWorkspace.Infrastructure.Persistence.Configurations;

public sealed class AcaiRoleConfiguration : IEntityTypeConfiguration<AcaiRole>
{
    public void Configure(EntityTypeBuilder<AcaiRole> builder)
    {
        builder.ToTable("acai_roles");

        builder.HasMany(x => x.Assignments)
            .WithOne(x => x.Role)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.RolePermissions)
            .WithOne(x => x.Role)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(x => x.DeletedAt == null);
    }
}
