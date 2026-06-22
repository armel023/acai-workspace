using FluentValidation;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.GetSubEntity;

public sealed class Validator : AbstractValidator<Query>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
