using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.SubEntityManagement.UpdateSubEntity;

public sealed class Handler : IRequestHandler<Command, Response?>
{
    private readonly AcaiDbContext _dbContext;
    private readonly IPermissionService _permissionService;
    private readonly ICurrentUser _currentUser;

    public Handler(AcaiDbContext dbContext, IPermissionService permissionService, ICurrentUser currentUser)
    {
        _dbContext = dbContext;
        _permissionService = permissionService;
        _currentUser = currentUser;
    }

    public async Task<Response?> Handle(Command request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.SubEntityManagement.SubEntitiesUpdate);

        var entity = await _dbContext.SubEntities
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity is null)
        {
            return null;
        }

        var businessEntityExists = await _dbContext.BusinessEntities
            .AsNoTracking()
            .AnyAsync(x => x.Id == request.BusinessEntityId, cancellationToken);

        if (!businessEntityExists)
        {
            throw new InvalidOperationException("Business entity was not found.");
        }

        var code = request.Code.Trim().ToUpperInvariant();

        var duplicateCode = await _dbContext.SubEntities
            .AsNoTracking()
            .AnyAsync(
                x => x.Id != request.Id
                     && x.BusinessEntityId == request.BusinessEntityId
                     && x.Code == code,
                cancellationToken);

        if (duplicateCode)
        {
            throw new InvalidOperationException("A sub-entity with this code already exists for the business entity.");
        }

        entity.BusinessEntityId = request.BusinessEntityId;
        entity.Name = request.Name.Trim();
        entity.Code = code;
        entity.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        entity.ModifiedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
            ? _currentUser.UserName
            : request.ModifiedBy?.Trim() ?? "system";

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            entity.Id,
            entity.BusinessEntityId,
            entity.Name,
            entity.Code,
            entity.Description,
            entity.ModifiedAt,
            entity.ModifiedBy);
    }
}
