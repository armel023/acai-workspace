using FluentValidation;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.UpdateBusinessEntity;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Code)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.Description)
            .MaximumLength(1000);

        RuleFor(x => x.ModifiedBy)
            .MaximumLength(100);
    }
}
