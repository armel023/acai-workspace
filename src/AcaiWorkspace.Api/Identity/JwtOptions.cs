namespace AcaiWorkspace.Api.Identity;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "acaiworkspace-api";
    public string Audience { get; set; } = "acaiworkspace-web";
    public string SigningKey { get; set; } = "THIS_IS_DEV_ONLY_CHANGE_ME_TO_A_LONG_RANDOM_SECRET";
    public int AccessTokenMinutes { get; set; } = 30;
    public int RefreshTokenDays { get; set; } = 14;
}
