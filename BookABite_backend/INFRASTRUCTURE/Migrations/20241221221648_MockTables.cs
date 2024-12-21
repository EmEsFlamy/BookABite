using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class MockTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Menus",
                columns: new[] { "Id", "FoodName", "FoodType", "Price" },
                values: new object[,]
                {
                    { 1, "Mozzarella Sticks", 0, 6.99m },
                    { 2, "Garlic Bread", 0, 4.99m },
                    { 3, "Chicken Wings", 0, 7.99m },
                    { 4, "Cheese Nachos", 0, 5.99m },
                    { 5, "Loaded Potato Skins", 0, 6.50m },
                    { 6, "Spring Rolls", 0, 4.99m },
                    { 7, "Stuffed Mushrooms", 0, 6.99m },
                    { 8, "Buffalo Cauliflower", 0, 5.50m },
                    { 9, "Mini Tacos", 0, 5.99m },
                    { 10, "Tomato Basil Soup", 2, 4.50m },
                    { 11, "Chicken Noodle Soup", 2, 5.50m },
                    { 12, "Minestrone Soup", 2, 4.75m },
                    { 13, "French Onion Soup", 2, 5.25m },
                    { 14, "Cream of Mushroom Soup", 2, 4.99m },
                    { 15, "Lentil Soup", 2, 4.50m },
                    { 16, "Clam Chowder", 2, 6.25m },
                    { 17, "Grilled Salmon", 3, 15.99m },
                    { 18, "Steak and Fries", 3, 19.99m },
                    { 19, "Pasta Primavera", 3, 12.99m },
                    { 20, "BBQ Ribs", 3, 17.99m },
                    { 21, "Chicken Alfredo", 3, 14.50m },
                    { 22, "Vegetarian Pizza", 3, 10.99m },
                    { 23, "Margherita Pizza", 3, 9.99m },
                    { 24, "Cheeseburger", 3, 11.50m },
                    { 25, "Beef Tacos", 3, 8.99m },
                    { 26, "Mini Cheeseburger", 4, 5.99m },
                    { 27, "Chicken Fingers", 4, 4.99m },
                    { 28, "Grilled Cheese", 4, 3.99m },
                    { 29, "Kids Pizza", 4, 4.99m },
                    { 30, "Pasta with Butter", 4, 3.50m },
                    { 31, "Mac and Cheese", 4, 4.25m },
                    { 32, "Caesar Salad", 5, 7.99m },
                    { 33, "Greek Salad", 5, 8.99m },
                    { 34, "House Salad", 5, 6.50m },
                    { 35, "Cobb Salad", 5, 9.99m },
                    { 36, "Coke", 1, 1.99m },
                    { 37, "Fresh Orange Juice", 1, 2.99m },
                    { 38, "House Wine", 6, 5.99m },
                    { 39, "Craft Beer", 6, 4.50m }
                });

            migrationBuilder.InsertData(
                table: "Tables",
                columns: new[] { "Id", "Seats", "TableStatus" },
                values: new object[,]
                {
                    { 1, 4, "Available" },
                    { 2, 4, "Available" },
                    { 3, 4, "Available" },
                    { 4, 4, "Available" },
                    { 5, 4, "Available" },
                    { 6, 4, "Available" },
                    { 7, 4, "Available" },
                    { 8, 4, "Available" },
                    { 9, 4, "Available" },
                    { 10, 4, "Available" },
                    { 11, 4, "Available" },
                    { 12, 4, "Available" },
                    { 13, 4, "Available" },
                    { 14, 4, "Available" },
                    { 15, 4, "Available" },
                    { 16, 4, "Available" },
                    { 17, 4, "Available" },
                    { 18, 4, "Available" },
                    { 19, 4, "Available" },
                    { 20, 4, "Available" },
                    { 21, 4, "Available" },
                    { 22, 4, "Available" },
                    { 23, 4, "Available" },
                    { 24, 4, "Available" },
                    { 25, 4, "Available" },
                    { 26, 4, "Available" },
                    { 27, 4, "Available" },
                    { 28, 4, "Available" },
                    { 29, 4, "Available" },
                    { 30, 4, "Available" },
                    { 31, 4, "Available" },
                    { 32, 4, "Available" },
                    { 33, 4, "Available" },
                    { 34, 4, "Available" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name", "Password", "PasswordSalt", "Surname", "UserType", "Username" },
                values: new object[,]
                {
                    { 1, "Admin", new byte[] { 178, 204, 120, 255, 248, 91, 192, 56, 237, 68, 148, 145, 78, 222, 26, 164, 179, 226, 64, 185, 18, 151, 69, 161, 225, 65, 227, 55, 103, 166, 213, 38 }, new byte[] { 239, 190, 157, 89, 201, 238, 243, 218, 251, 243, 30, 49, 143, 64, 58, 221 }, "Admin", 0, "admin" },
                    { 2, "Waiter", new byte[] { 154, 26, 221, 0, 20, 214, 176, 191, 50, 170, 213, 131, 208, 88, 41, 198, 84, 44, 235, 156, 92, 101, 119, 51, 197, 154, 95, 212, 165, 248, 99, 66 }, new byte[] { 220, 99, 18, 226, 164, 9, 143, 169, 36, 16, 149, 251, 44, 164, 170, 94 }, "Waiter", 1, "waiter" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Menus",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Tables",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
