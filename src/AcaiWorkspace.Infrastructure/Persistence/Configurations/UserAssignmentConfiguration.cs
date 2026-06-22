using AcaiWorkspace.Domain.Entities.Identity;
using AcaiWorkspace.Domain.Entities.Organization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AcaiWorkspace.Infrastructure.Persistence.Configurations;

public sealed class UserAssignmentConfiguration : IEntityTypeConfiguration<UserAssignment>
{
    public void Configure(EntityTypeBuilder<UserAssignment> builder)
    {
        builder.ToTable("acai_user_assignments");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.AssignedAtUtc).IsRequired();
        builder.Property(x => x.IsActive).IsRequired();

        builder.HasIndex(x => new { x.UserId, x.BusinessEntityId });
        builder.HasIndex(x => new { x.UserId, x.SubEntityId });
        builder.HasIndex(x => x.RoleId);
        builder.HasIndex(x => x.IsActive);

        builder.HasOne(x => x.User)
            .WithMany(x => x.Assignments)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.BusinessEntity)
            .WithMany()
            .HasForeignKey(x => x.BusinessEntityId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.SubEntity)
            .WithMany()
            .HasForeignKey(x => x.SubEntityId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Role)
            .WithMany(x => x.Assignments)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne<AcaiUser>()
            .WithMany()
            .HasForeignKey(x => x.AssignedByUserId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasQueryFilter(x => x.DeletedAt == null);
    }
}
