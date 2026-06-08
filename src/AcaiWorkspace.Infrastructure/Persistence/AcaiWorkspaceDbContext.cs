using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Domain.Entities;

namespace AcaiWorkspace.Infrastructure.Persistence;

public sealed class AcaiWorkspaceDbContext : DbContext
{
    public AcaiWorkspaceDbContext(DbContextOptions<AcaiWorkspaceDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AcaiWorkspaceDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
