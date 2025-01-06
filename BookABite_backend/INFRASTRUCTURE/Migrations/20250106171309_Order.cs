using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class Order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeEnd",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TimeStart",
                table: "Orders");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "TimeEnd",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStart",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 178, 204, 120, 255, 248, 91, 192, 56, 237, 68, 148, 145, 78, 222, 26, 164, 179, 226, 64, 185, 18, 151, 69, 161, 225, 65, 227, 55, 103, 166, 213, 38 }, new byte[] { 239, 190, 157, 89, 201, 238, 243, 218, 251, 243, 30, 49, 143, 64, 58, 221 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Password", "PasswordSalt" },
                values: new object[] { new byte[] { 154, 26, 221, 0, 20, 214, 176, 191, 50, 170, 213, 131, 208, 88, 41, 198, 84, 44, 235, 156, 92, 101, 119, 51, 197, 154, 95, 212, 165, 248, 99, 66 }, new byte[] { 220, 99, 18, 226, 164, 9, 143, 169, 36, 16, 149, 251, 44, 164, 170, 94 } });
        }
    }
}
