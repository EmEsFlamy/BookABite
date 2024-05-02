using DOMAIN.Entities;
using Microsoft.EntityFrameworkCore;


namespace INFRASTRUCTURE.Database;

public class BookABiteDbContext : DbContext
{
    public BookABiteDbContext(DbContextOptions<BookABiteDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}
