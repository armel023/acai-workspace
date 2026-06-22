using MediatR;
using Microsoft.EntityFrameworkCore;
using AcaiWorkspace.Api.Identity.Policies;
using AcaiWorkspace.Domain.Entities.Organization;
using AcaiWorkspace.Infrastructure.Persistence;

namespace AcaiWorkspace.Api.Features.BusinessEntityManagement.CreateBusinessEntity;

public sealed class Handler : IRequestHandler<Command, Response>
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

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        _permissionService.RequirePermission(Permissions.BusinessEntityManagement.BusinessEntitiesCreate);

        var name = request.Name.Trim();
        var code = request.Code.Trim().ToUpperInvariant();

        var duplicateCode = await _dbContext.BusinessEntities
            .AsNoTracking()
            .AnyAsync(x => x.Code == code, cancellationToken);

        if (duplicateCode)
        {
            throw new InvalidOperationException("A business entity with this code already exists.");
        }

        var entity = new BusinessEntity
        {
            Id = Guid.NewGuid(),
            Name = name,
            Code = code,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            CreatedBy = !string.IsNullOrWhiteSpace(_currentUser.UserName)
                ? _currentUser.UserName
                : request.CreatedBy?.Trim() ?? "system"
        };

        _dbContext.BusinessEntities.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response(
            entity.Id,
            entity.Name,
            entity.Code,
            entity.Description,
            entity.CreatedAt,
            entity.CreatedBy);
    }
}
