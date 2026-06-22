using AcaiWorkspace.Domain.Entities.Organization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AcaiWorkspace.Infrastructure.Persistence.Configurations;

public sealed class SubEntityConfiguration : IEntityTypeConfiguration<SubEntity>
{
    public void Configure(EntityTypeBuilder<SubEntity> builder)
    {
        builder.ToTable("acai_sub_entities");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.Code).HasMaxLength(50).IsRequired();
        builder.Property(x => x.Description).HasMaxLength(1000);

        builder.HasIndex(x => new { x.BusinessEntityId, x.Code }).IsUnique();

        builder.HasOne(x => x.BusinessEntity)
            .WithMany(x => x.SubEntities)
            .HasForeignKey(x => x.BusinessEntityId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(x => x.DeletedAt == null);
    }
}
