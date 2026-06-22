using AcaiWorkspace.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AcaiWorkspace.Infrastructure.Persistence.Configurations;

public sealed class AcaiUserConfiguration : IEntityTypeConfiguration<AcaiUser>
{
    public void Configure(EntityTypeBuilder<AcaiUser> builder)
    {
        builder.ToTable("acai_users");

        builder.Property(x => x.FirstName).HasMaxLength(100).IsRequired();
        builder.Property(x => x.LastName).HasMaxLength(100).IsRequired();
        builder.Property(x => x.FullName).HasMaxLength(201).IsRequired();
        builder.Property(x => x.DisplayName).HasMaxLength(200);

        builder.HasMany(x => x.Assignments)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(x => x.DeletedAt == null);
    }
}
