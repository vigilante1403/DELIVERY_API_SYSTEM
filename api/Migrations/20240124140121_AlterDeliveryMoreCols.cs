using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AlterDeliveryMoreCols : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ZipCode",
                table: "Wards",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ZipCodeEnd",
                table: "Deliveries",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ZipCodeStart",
                table: "Deliveries",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Wards");

            migrationBuilder.DropColumn(
                name: "ZipCodeEnd",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "ZipCodeStart",
                table: "Deliveries");
        }
    }
}
