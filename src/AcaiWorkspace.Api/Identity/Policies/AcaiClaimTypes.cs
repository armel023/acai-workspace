namespace AcaiWorkspace.Api.Identity.Policies;

public static class AcaiClaimTypes
{
    public const string Permission = "permission";
    public const string ActiveBusinessEntityId = "active_business_entity_id";
    public const string ActiveSubEntityId = "active_sub_entity_id";

    public const string BusinessEntityId = ActiveBusinessEntityId;
    public const string SubEntityId = ActiveSubEntityId;
}
