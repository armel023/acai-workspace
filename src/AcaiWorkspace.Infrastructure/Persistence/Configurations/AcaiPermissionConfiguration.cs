using AcaiWorkspace.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AcaiWorkspace.Infrastructure.Persistence.Configurations;

public sealed class AcaiPermissionConfiguration : IEntityTypeConfiguration<AcaiPermission>
{
    public void Configure(EntityTypeBuilder<AcaiPermission> builder)
    {
        builder.ToTable("acai_permissions");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(300).IsRequired();

        builder.HasIndex(x => x.Name).IsUnique();
    }
}
