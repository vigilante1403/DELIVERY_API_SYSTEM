using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AlterDeliveryTable2Cols : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EmailDeliveryReached",
                table: "Deliveries",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailDeliveryStart",
                table: "Deliveries",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailDeliveryReached",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "EmailDeliveryStart",
                table: "Deliveries");
        }
    }
}
