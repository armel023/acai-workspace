using AcaiWorkspace.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public static class DatabaseInitializer
{
    public static async Task MigrateAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();

        var dbContext = scope.ServiceProvider
            .GetRequiredService<AcaiDbContext>();

        await dbContext.Database.MigrateAsync();
    }
}