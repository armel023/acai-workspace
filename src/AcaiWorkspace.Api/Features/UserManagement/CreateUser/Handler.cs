using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Domain.Entities.Identity;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.UserManagement.CreateUser;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IAuthorizationService _authorizationService;
    private readonly ICurrentUser _currentUser;

    public Handler(
        AcaiDbContext dbContext,
        IAuthorizationService authorizationService,
        ICurrentUser currentUser)
    {
        _dbContext = dbContext;
        _authorizationService = authorizationService;
        _currentUser = currentUser;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        _authorizationService.EnsureCanCreateUser();

        var emailExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.Email == request.Email, cancellationToken);

        if (emailExists)
        {
            throw new InvalidOperationException("A user with this email already exists.");
        }

        var usernameExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(x => x.UserName == request.Username, cancellationToken);

        if (usernameExists)
        {
            throw new InvalidOperationException("A user with this username already exists.");
        }

        var user = new AcaiUser
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            UserName = request.Username.Trim(),
            CreatedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
                ? _currentUser.UserName
                : request.CreatedBy?.Trim() ?? "system"
        };

        user.UpdateNames();

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            user.Id,
            user.FirstName,
            user.LastName,
            user.FullName,
            user.Email,
            user.UserName ?? string.Empty,
            user.CreatedAt,
            user.CreatedBy);
    }
}
