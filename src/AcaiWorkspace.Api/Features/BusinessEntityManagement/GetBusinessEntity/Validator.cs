using FluentValidation;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.GetBusinessEntity;

public sealed class Validator : AbstractValidator<Query>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
