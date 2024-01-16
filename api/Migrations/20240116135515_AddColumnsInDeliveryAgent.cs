using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AddColumnsInDeliveryAgent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Charges",
                table: "DeliveryAgents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DayMayDelay",
                table: "DeliveryAgents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndWorkingTime",
                table: "DeliveryAgents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MaxFreeWeight",
                table: "DeliveryAgents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PickUpTimeForSpecialOrder",
                table: "DeliveryAgents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PickUpTimeInCity",
                table: "DeliveryAgents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PickUpTimeInOtherPlace",
                table: "DeliveryAgents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequiredTimeForOrderToPickUp",
                table: "DeliveryAgents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartWorkingTime",
                table: "DeliveryAgents",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Charges",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "DayMayDelay",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "EndWorkingTime",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "MaxFreeWeight",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "PickUpTimeForSpecialOrder",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "PickUpTimeInCity",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "PickUpTimeInOtherPlace",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "RequiredTimeForOrderToPickUp",
                table: "DeliveryAgents");

            migrationBuilder.DropColumn(
                name: "StartWorkingTime",
                table: "DeliveryAgents");
        }
    }
}
