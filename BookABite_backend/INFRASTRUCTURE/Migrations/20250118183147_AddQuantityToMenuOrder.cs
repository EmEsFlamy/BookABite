using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class AddQuantityToMenuOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "MenuOrders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 127, 112, 200, 150, 198, 97, 207, 95, 236, 94, 186, 160, 49, 60, 192, 95, 217, 30, 77, 246, 26, 19, 224, 128, 122, 236, 237, 115, 190, 92, 200, 127 }, new byte[] { 231, 157, 91, 122, 167, 97, 111, 27, 90, 123, 237, 45, 203, 244, 153, 62 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 90, 118, 165, 56, 164, 254, 200, 94, 232, 57, 213, 101, 180, 111, 41, 165, 91, 67, 131, 146, 236, 132, 98, 165, 86, 123, 153, 68, 53, 123, 44, 208 }, new byte[] { 133, 156, 7, 125, 93, 245, 21, 242, 137, 219, 32, 218, 134, 5, 110, 106 } });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "MenuOrders");

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
        }
    }
}
