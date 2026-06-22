using FluentValidation;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.ResetUserAssignments;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.ModifiedBy).MaximumLength(100);
    }
}
