using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using INFRASTRUCTURE.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace INFRASTRUCTURE;

public static class DependencyInjection
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var conn = configuration.GetConnectionString("Default");
        services.AddDbContext<BookABiteDbContext>(options => {
            options.UseNpgsql(conn);
        });

        services.AddScoped<IReservationRepository, ReservationRespository>();
        services.AddScoped<IMenuRepository, MenuRepository>();

        return services;
    }
}
