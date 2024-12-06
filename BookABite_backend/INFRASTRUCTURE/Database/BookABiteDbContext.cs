using INFRASTRUCTURE.Entities;
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
        
    }

}
