using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AlterTableService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryAgentId",
                table: "Services",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_DeliveryAgentId",
                table: "Services",
                column: "DeliveryAgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_DeliveryAgents_DeliveryAgentId",
                table: "Services",
                column: "DeliveryAgentId",
                principalTable: "DeliveryAgents",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_DeliveryAgents_DeliveryAgentId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_DeliveryAgentId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "DeliveryAgentId",
                table: "Services");
        }
    }
}
