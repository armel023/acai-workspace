using FluentValidation;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.UpdateUserAssignment;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.RoleId).NotEmpty();
        RuleFor(x => x.ModifiedBy).MaximumLength(100);
    }
}
