using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Domain.Entities;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.CreateUser;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiWorkspaceDbContext _dbContext;

    public Handler(AcaiWorkspaceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var emailExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Email == request.Email, cancellationToken);

        if (emailExists)
        {
            throw new InvalidOperationException("A user with this email already exists.");
        }

        var usernameExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Username == request.Username, cancellationToken);

        if (usernameExists)
        {
            throw new InvalidOperationException("A user with this username already exists.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            Username = request.Username.Trim(),
            CreatedAt = DateTime.UtcNow,
            CreatedBy = request.CreatedBy.Trim()
        };

        user.UpdateFullName();

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            user.Id,
            user.FirstName,
            user.LastName,
            user.FullName,
            user.Email,
            user.Username,
            user.CreatedAt,
            user.CreatedBy);
    }
}
