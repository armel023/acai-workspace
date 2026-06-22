using FluentValidation;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.SearchSubEntity;

public sealed class Validator : AbstractValidator<Query>
{
    private static readonly string[] AllowedSortBy = ["name", "code", "createdAt"];
    private static readonly string[] AllowedDirection = ["asc", "desc"];

    public Validator()
    {
        RuleFor(x => x.Page)
            .GreaterThan(0);

        RuleFor(x => x.PageSize)
            .GreaterThan(0)
            .LessThanOrEqualTo(100);

        RuleFor(x => x.SortBy)
            .Must(x => string.IsNullOrWhiteSpace(x) || AllowedSortBy.Contains(x, StringComparer.OrdinalIgnoreCase))
            .WithMessage("SortBy must be one of: name, code, createdAt.");

        RuleFor(x => x.Direction)
            .Must(x => string.IsNullOrWhiteSpace(x) || AllowedDirection.Contains(x, StringComparer.OrdinalIgnoreCase))
            .WithMessage("Direction must be one of: asc, desc.");

        RuleFor(x => x)
            .Must(x => !x.CreatedAtFrom.HasValue || !x.CreatedAtTo.HasValue || x.CreatedAtFrom.Value <= x.CreatedAtTo.Value)
            .WithMessage("CreatedAtFrom must be less than or equal to CreatedAtTo.");
    }
}
