using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcaiWorkspace.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMultiTenant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessEntityId",
                table: "acai_users");

            migrationBuilder.DropColumn(
                name: "SubEntityId",
                table: "acai_users");

            migrationBuilder.CreateTable(
                name: "acai_business_entities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    DeletedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    DeletedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acai_business_entities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "acai_permissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    DeletedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    DeletedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acai_permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "acai_sub_entities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BusinessEntityId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    DeletedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    DeletedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acai_sub_entities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_acai_sub_entities_acai_business_entities_BusinessEntityId",
                        column: x => x.BusinessEntityId,
                        principalTable: "acai_business_entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "acai_role_permissions",
                columns: table => new
                {
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    PermissionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acai_role_permissions", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_acai_role_permissions_acai_permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "acai_permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_acai_role_permissions_acai_roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "acai_roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "acai_user_assignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    BusinessEntityId = table.Column<Guid>(type: "uuid", nullable: false),
                    SubEntityId = table.Column<Guid>(type: "uuid", nullable: true),
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssignedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    AssignedAtUtc = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    DeletedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    DeletedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acai_user_assignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_acai_user_assignments_acai_business_entities_BusinessEntity~",
                        column: x => x.BusinessEntityId,
                        principalTable: "acai_business_entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_acai_user_assignments_acai_roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "acai_roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_acai_user_assignments_acai_sub_entities_SubEntityId",
                        column: x => x.SubEntityId,
                        principalTable: "acai_sub_entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_acai_user_assignments_acai_users_AssignedByUserId",
                        column: x => x.AssignedByUserId,
                        principalTable: "acai_users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_acai_user_assignments_acai_users_UserId",
                        column: x => x.UserId,
                        principalTable: "acai_users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_acai_business_entities_Code",
                table: "acai_business_entities",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_acai_permissions_Name",
                table: "acai_permissions",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_acai_role_permissions_PermissionId",
                table: "acai_role_permissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_acai_sub_entities_BusinessEntityId_Code",
                table: "acai_sub_entities",
                columns: new[] { "BusinessEntityId", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_AssignedByUserId",
                table: "acai_user_assignments",
                column: "AssignedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_BusinessEntityId",
                table: "acai_user_assignments",
                column: "BusinessEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_IsActive",
                table: "acai_user_assignments",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_RoleId",
                table: "acai_user_assignments",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_SubEntityId",
                table: "acai_user_assignments",
                column: "SubEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_UserId_BusinessEntityId",
                table: "acai_user_assignments",
                columns: new[] { "UserId", "BusinessEntityId" });

            migrationBuilder.CreateIndex(
                name: "IX_acai_user_assignments_UserId_SubEntityId",
                table: "acai_user_assignments",
                columns: new[] { "UserId", "SubEntityId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "acai_role_permissions");

            migrationBuilder.DropTable(
                name: "acai_user_assignments");

            migrationBuilder.DropTable(
                name: "acai_permissions");

            migrationBuilder.DropTable(
                name: "acai_sub_entities");

            migrationBuilder.DropTable(
                name: "acai_business_entities");

            migrationBuilder.AddColumn<Guid>(
                name: "BusinessEntityId",
                table: "acai_users",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SubEntityId",
                table: "acai_users",
                type: "uuid",
                nullable: true);
        }
    }
}
