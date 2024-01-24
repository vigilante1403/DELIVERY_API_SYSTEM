using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AlterOrder1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "used",
                table: "ResetPasswords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "CodeLocation",
                table: "Deliveries",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "VPPMoney",
                table: "Deliveries",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "used",
                table: "ResetPasswords");

            migrationBuilder.DropColumn(
                name: "CodeLocation",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "VPPMoney",
                table: "Deliveries");
        }
    }
}
