using FluentValidation;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.CreateUserAssignment;

public sealed class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.RoleId).NotEmpty();
        RuleFor(x => x.CreatedBy).MaximumLength(100);
    }
}
