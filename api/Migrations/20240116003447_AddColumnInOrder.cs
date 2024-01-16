using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AddColumnInOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PricePerDistanceId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PricePerDistanceId",
                table: "Orders",
                column: "PricePerDistanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_PricePerDistances_PricePerDistanceId",
                table: "Orders",
                column: "PricePerDistanceId",
                principalTable: "PricePerDistances",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_PricePerDistances_PricePerDistanceId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PricePerDistanceId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PricePerDistanceId",
                table: "Orders");
        }
    }
}
