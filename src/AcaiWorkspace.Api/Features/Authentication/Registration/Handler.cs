using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Domain.Entities.Identity;

namespace AcaiWorkspace.Api.Features.Authentication.Registration;

public sealed class Handler : IRequestHandler<Command, Response>
{
    private readonly UserManager<AcaiUser> _userManager;

    public Handler(UserManager<AcaiUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var firstName = request.FirstName.Trim();
        var lastName = request.LastName.Trim();
        var fullName = $"{firstName} {lastName}".Trim();

        var existingUser = await _userManager.Users
            .AsNoTracking()
            .AnyAsync(x => x.Email == email, cancellationToken);

        if (existingUser)
        {
            throw new InvalidOperationException("A user with this email already exists.");
        }

        var user = new AcaiUser
        {
            Id = Guid.NewGuid(),
            FirstName = firstName,
            LastName = lastName,
            FullName = fullName,
            Email = email,
            UserName = email,
            NormalizedEmail = email.ToUpperInvariant(),
            NormalizedUserName = email.ToUpperInvariant(),
            EmailConfirmed = true,
            DisplayName = fullName,
            CreatedBy = "system"
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(x => $"{x.Code}:{x.Description}"));
            throw new InvalidOperationException($"Failed to register user. {errors}");
        }

        if (await _userManager.IsInRoleAsync(user, AcaiRoles.Assistant) is false)
        {
            await _userManager.AddToRoleAsync(user, AcaiRoles.Assistant);
        }

        return new Response(
            user.Id,
            user.DisplayName,
            user.Email ?? string.Empty,
            user.UserName ?? string.Empty,
            DateTime.UtcNow);
    }
}
