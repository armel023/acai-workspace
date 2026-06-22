using FluentValidation;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.DeleteBusinessEntity;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
