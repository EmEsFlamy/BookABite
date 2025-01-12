using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class UserTableRestructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_TableId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 203, 83, 92, 38, 211, 83, 81, 207, 13, 245, 166, 6, 97, 90, 86, 86, 103, 199, 245, 191, 109, 2, 106, 201, 220, 111, 34, 149, 164, 3, 32, 131 }, new byte[] { 52, 7, 144, 213, 169, 147, 235, 100, 175, 173, 150, 203, 117, 54, 116, 238 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 97, 7, 220, 173, 117, 134, 71, 82, 111, 251, 137, 150, 4, 116, 17, 127, 87, 78, 91, 254, 53, 225, 51, 254, 245, 184, 223, 69, 40, 52, 233, 171 }, new byte[] { 4, 200, 80, 168, 96, 249, 30, 54, 229, 41, 86, 211, 147, 244, 148, 131 } });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_TableId",
                table: "Orders",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_TableId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

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
        }
    }
}
