using FluentValidation;

namespace AcaiWorkspace.Api.Features.Authentication.RefreshToken;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.RefreshToken).NotEmpty();
    }
}
