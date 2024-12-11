using INFRASTRUCTURE.Entities;
using INFRASTRUCTURE.Enums;
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

        //var polandTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");

        //modelBuilder.Entity<Reservation>()
        //    .Property(r => r.ReservationStart)
        //    .HasConversion(
        //        v => TimeZoneInfo.ConvertTimeToUtc(v, polandTimeZone),
        //        v => TimeZoneInfo.ConvertTimeFromUtc(v, polandTimeZone) 
        //    );

        //modelBuilder.Entity<Reservation>()
        //    .Property(r => r.ReservationEnd)
        //    .HasConversion(
        //        v => TimeZoneInfo.ConvertTimeToUtc(v, polandTimeZone),
        //        v => TimeZoneInfo.ConvertTimeFromUtc(v, polandTimeZone)
        //    );
    }

}
