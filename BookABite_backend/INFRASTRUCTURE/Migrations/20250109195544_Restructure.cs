using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class Restructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuOrders_Tables_TableId",
                table: "MenuOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuOrders_Users_UserId",
                table: "MenuOrders");

            migrationBuilder.DropIndex(
                name: "IX_MenuOrders_TableId",
                table: "MenuOrders");

            migrationBuilder.DropIndex(
                name: "IX_MenuOrders_UserId",
                table: "MenuOrders");

            migrationBuilder.DropColumn(
                name: "TableId",
                table: "MenuOrders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MenuOrders");

            migrationBuilder.AddColumn<int>(
                name: "TableId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 123, 161, 77, 1, 153, 169, 114, 171, 249, 121, 81, 100, 99, 216, 165, 188, 220, 183, 44, 143, 64, 212, 94, 44, 66, 46, 198, 132, 56, 124, 131, 120 }, new byte[] { 5, 149, 150, 187, 63, 134, 154, 174, 33, 68, 204, 23, 30, 17, 69, 119 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 173, 108, 95, 162, 254, 161, 120, 91, 28, 198, 182, 43, 115, 252, 144, 18, 77, 120, 72, 204, 31, 65, 124, 66, 185, 240, 78, 14, 141, 173, 204, 224 }, new byte[] { 161, 120, 236, 166, 87, 29, 148, 155, 105, 136, 74, 208, 162, 103, 199, 176 } });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_TableId",
                table: "Orders",
                column: "TableId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Tables_TableId",
                table: "Orders",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Tables_TableId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_TableId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TableId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "TableId",
                table: "MenuOrders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MenuOrders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 43, 115, 68, 228, 173, 95, 218, 26, 68, 239, 114, 165, 189, 190, 249, 154, 48, 220, 220, 120, 169, 17, 139, 36, 254, 237, 231, 226, 90, 153, 250, 96 }, new byte[] { 29, 187, 183, 59, 126, 34, 11, 232, 206, 170, 100, 202, 207, 105, 116, 68 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 174, 85, 120, 152, 123, 83, 47, 251, 179, 66, 134, 203, 19, 107, 47, 12, 163, 16, 175, 196, 54, 132, 154, 230, 250, 85, 130, 83, 163, 115, 177, 165 }, new byte[] { 231, 119, 19, 55, 84, 246, 121, 242, 17, 137, 248, 248, 230, 74, 119, 64 } });

            migrationBuilder.CreateIndex(
                name: "IX_MenuOrders_TableId",
                table: "MenuOrders",
                column: "TableId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuOrders_UserId",
                table: "MenuOrders",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuOrders_Tables_TableId",
                table: "MenuOrders",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuOrders_Users_UserId",
                table: "MenuOrders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
