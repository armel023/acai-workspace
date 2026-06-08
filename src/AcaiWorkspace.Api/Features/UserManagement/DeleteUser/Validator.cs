using FluentValidation;

namespace AcaiWorkspace.Api.Features.UserManagement.DeleteUser;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
