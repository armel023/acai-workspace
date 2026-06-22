using FluentValidation;

namespace AcaiWorkspace.Api.Features.UserAssignmentManagement.SearchUserAssignment;

public sealed class Validator : AbstractValidator<Query>
{
    private static readonly string[] AllowedSortBy =
    [
        "userdisplayname",
        "useremail",
        "username",
        "role",
        "businessentityname",
        "subentityname",
        "createdat",
        "modifiedat"
    ];

    private static readonly string[] AllowedDirection = ["asc", "desc"];

    public Validator()
    {
        RuleFor(x => x.Page)
            .GreaterThan(0);

        RuleFor(x => x.PageSize)
            .GreaterThan(0)
            .LessThanOrEqualTo(100);

        RuleFor(x => x.SortBy)
            .Must(x => string.IsNullOrWhiteSpace(x) || AllowedSortBy.Contains(x.Trim(), StringComparer.OrdinalIgnoreCase))
            .WithMessage("SortBy must be one of: userDisplayName, userEmail, userName, role, businessEntityName, subEntityName, createdAt, modifiedAt.");

        RuleFor(x => x.Direction)
            .Must(x => string.IsNullOrWhiteSpace(x) || AllowedDirection.Contains(x.Trim(), StringComparer.OrdinalIgnoreCase))
            .WithMessage("Direction must be one of: asc, desc.");

        RuleFor(x => x)
            .Must(x => !x.CreatedAtFrom.HasValue || !x.CreatedAtTo.HasValue || x.CreatedAtFrom.Value <= x.CreatedAtTo.Value)
            .WithMessage("CreatedAtFrom must be less than or equal to CreatedAtTo.");

        RuleFor(x => x)
            .Must(x => !x.ModifiedAtFrom.HasValue || !x.ModifiedAtTo.HasValue || x.ModifiedAtFrom.Value <= x.ModifiedAtTo.Value)
            .WithMessage("ModifiedAtFrom must be less than or equal to ModifiedAtTo.");
    }
}
