using INFRASTRUCTURE.Entities;
using INFRASTRUCTURE.Enums;
using INFRASTRUCTURE.Security;
using Microsoft.EntityFrameworkCore;


namespace INFRASTRUCTURE.Database;

public class BookABiteDbContext : DbContext
{
    public BookABiteDbContext(DbContextOptions<BookABiteDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Menu> Menus { get; set; }
    public DbSet<Table> Tables { get; set; }
    public DbSet<Order> Orders {  get; set; }
    public DbSet<MenuOrder> MenuOrders { get; set; }
    public DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Table>()
            .Property(t => t.TableStatus)
            .HasConversion(
                v => v.ToString(),
                v => (TableStatusEnum)Enum.Parse(typeof(TableStatusEnum), v)
            );

        var tables = Enumerable.Range(1, 34).Select(id => new Table
        {
            Id = id,
            Seats = 4, 
            TableStatus = TableStatusEnum.Available
        }).ToList();
        modelBuilder.Entity<Table>().HasData(tables);

        var adminPassword = PasswordHasher.HashPassword(System.Text.Encoding.UTF8.GetBytes("admin"));
        var waiterPassword = PasswordHasher.HashPassword(System.Text.Encoding.UTF8.GetBytes("waiter"));


        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Admin",
                Surname = "Admin",
                Username = "admin",
                Password = adminPassword.Hash,
                PasswordSalt = adminPassword.Salt,
                UserType = UserTypeEnum.Admin
            },
            new User
            {
                Id = 2,
                Name = "Waiter",
                Surname = "Waiter",
                Username = "waiter",
                Password = waiterPassword.Hash,
                PasswordSalt = waiterPassword.Salt,
                UserType = UserTypeEnum.Waiter
            }
        );

        modelBuilder.Entity<Menu>().HasData(
        new Menu { Id = 1, FoodName = "Mozzarella Sticks", Price = 6.99M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 2, FoodName = "Garlic Bread", Price = 4.99M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 3, FoodName = "Chicken Wings", Price = 7.99M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 4, FoodName = "Cheese Nachos", Price = 5.99M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 5, FoodName = "Loaded Potato Skins", Price = 6.50M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 6, FoodName = "Spring Rolls", Price = 4.99M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 7, FoodName = "Stuffed Mushrooms", Price = 6.99M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 8, FoodName = "Buffalo Cauliflower", Price = 5.50M, FoodType = FoodTypeEnum.Starters },
        new Menu { Id = 9, FoodName = "Mini Tacos", Price = 5.99M, FoodType = FoodTypeEnum.Starters },

        new Menu { Id = 10, FoodName = "Tomato Basil Soup", Price = 4.50M, FoodType = FoodTypeEnum.Soups },
        new Menu { Id = 11, FoodName = "Chicken Noodle Soup", Price = 5.50M, FoodType = FoodTypeEnum.Soups },
        new Menu { Id = 12, FoodName = "Minestrone Soup", Price = 4.75M, FoodType = FoodTypeEnum.Soups },
        new Menu { Id = 13, FoodName = "French Onion Soup", Price = 5.25M, FoodType = FoodTypeEnum.Soups },
        new Menu { Id = 14, FoodName = "Cream of Mushroom Soup", Price = 4.99M, FoodType = FoodTypeEnum.Soups },
        new Menu { Id = 15, FoodName = "Lentil Soup", Price = 4.50M, FoodType = FoodTypeEnum.Soups },
        new Menu { Id = 16, FoodName = "Clam Chowder", Price = 6.25M, FoodType = FoodTypeEnum.Soups },

        new Menu { Id = 17, FoodName = "Grilled Salmon", Price = 15.99M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 18, FoodName = "Steak and Fries", Price = 19.99M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 19, FoodName = "Pasta Primavera", Price = 12.99M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 20, FoodName = "BBQ Ribs", Price = 17.99M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 21, FoodName = "Chicken Alfredo", Price = 14.50M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 22, FoodName = "Vegetarian Pizza", Price = 10.99M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 23, FoodName = "Margherita Pizza", Price = 9.99M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 24, FoodName = "Cheeseburger", Price = 11.50M, FoodType = FoodTypeEnum.Main },
        new Menu { Id = 25, FoodName = "Beef Tacos", Price = 8.99M, FoodType = FoodTypeEnum.Main },

        new Menu { Id = 26, FoodName = "Mini Cheeseburger", Price = 5.99M, FoodType = FoodTypeEnum.Kids },
        new Menu { Id = 27, FoodName = "Chicken Fingers", Price = 4.99M, FoodType = FoodTypeEnum.Kids },
        new Menu { Id = 28, FoodName = "Grilled Cheese", Price = 3.99M, FoodType = FoodTypeEnum.Kids },
        new Menu { Id = 29, FoodName = "Kids Pizza", Price = 4.99M, FoodType = FoodTypeEnum.Kids },
        new Menu { Id = 30, FoodName = "Pasta with Butter", Price = 3.50M, FoodType = FoodTypeEnum.Kids },
        new Menu { Id = 31, FoodName = "Mac and Cheese", Price = 4.25M, FoodType = FoodTypeEnum.Kids },

        new Menu { Id = 32, FoodName = "Caesar Salad", Price = 7.99M, FoodType = FoodTypeEnum.Salads },
        new Menu { Id = 33, FoodName = "Greek Salad", Price = 8.99M, FoodType = FoodTypeEnum.Salads },
        new Menu { Id = 34, FoodName = "House Salad", Price = 6.50M, FoodType = FoodTypeEnum.Salads },
        new Menu { Id = 35, FoodName = "Cobb Salad", Price = 9.99M, FoodType = FoodTypeEnum.Salads },

        new Menu { Id = 36, FoodName = "Coke", Price = 1.99M, FoodType = FoodTypeEnum.Drinks },
        new Menu { Id = 37, FoodName = "Fresh Orange Juice", Price = 2.99M, FoodType = FoodTypeEnum.Drinks },

        new Menu { Id = 38, FoodName = "House Wine", Price = 5.99M, FoodType = FoodTypeEnum.Alcohol },
        new Menu { Id = 39, FoodName = "Craft Beer", Price = 4.50M, FoodType = FoodTypeEnum.Alcohol }
    );
    }


}
