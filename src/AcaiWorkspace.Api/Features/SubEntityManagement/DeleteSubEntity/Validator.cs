using FluentValidation;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.DeleteSubEntity;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
